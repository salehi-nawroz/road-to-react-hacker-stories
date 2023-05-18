import * as React from 'react';

const initialStories =[
  {
    title: 'react',
    url:'url/abc/db',
    author: 'Ahmad alizada',
    num_comments: 4,
    points:4,
    objectID:1
  },
  {
    title: 'redux',
    url:'url/abc/db',
    author: 'Ahmad Nadem',
    num_comments: 3,
    points:2,
    objectID:7
  },
  {
    title: 'vuex',
    url:'url/abc/db',
    author: 'Nawroz Salehi',
    num_comments: 3,
    points:2,
    objectID:2
  }
]  

// REDUCER/REDUX
const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
        (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
    }
  };


const List = ({list, onRemoveItem}) => 
  list.map(item=>(
    <Item 
      key={item.objectID}
      item={item}
      onRemoveItem = {onRemoveItem}
    />
  ));

const Item = ({item, onRemoveItem}) =>{
  
  return (
    <li>
      <span>
        <a href={item.url} >{item.title}</a> &nbsp;&nbsp;
      </span>     <span>{item.author}</span>&nbsp;&nbsp;
      <span>{item.num_comments}</span>&nbsp;&nbsp;
      <span>{item.points}</span>
      <span>
        <button type="button" onClick={()=>onRemoveItem(item)}>
          Remove
        </button>
      </span>
  </li>
  );
}



const Search=(props)=>{
  const handleChange = (event)=> {
      props.onSearch(event);
  }
  return (
      <>
        
        <p>
          search for <strong>{props.searchTerm}</strong>
        </p>
      </>
      );
  }

const App = () => {

     
  const useSemiPersistentState = (key, initialState) => {
    const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);

    React.useEffect(() => {
      localStorage.setItem(key, value)
    }, [value]);

    return [value, setValue];
  }

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search','vue');
  // Old way
  //const [stories, setStories] = React.useState([]);
  // New way
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
   { data: [], isLoading:false, isError:false}
    );
 

  const getAsyncStories = () =>
      new Promise((resolve) =>
      setTimeout(
        () => resolve({ data: { stories: initialStories } }),
        2000
      )
    );

  React.useEffect(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    getAsyncStories().then(result => {
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.stories,
        });
    })
     .catch(()=>
         dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
     );
    }, [])



  const handleRemoveStory = item => {
    const newStories = stories.data.filter(
      story => item.objectID !== story.objectID
    );
   // setStories(newStories);

    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
      });
  }

  
  const handleSearch = (event) => {
      setSearchTerm(event.target.value);
      console.log(event.target.value); 
  }

  const searchedStories = stories.data.filter((story) => {
      return story.title.includes(searchTerm.toLowerCase());
  });
  
    return (
      <div>
        <h1>My Hacker Stories</h1>
        {/* <Search onSearch={handleSearch} searchTerm={searchTerm}/> */}
         <InputWithLabel 
          id="search" 
          value={searchTerm} 
          onInputChange={handleSearch}
          >
          <strong>Search</strong> {/* Children */}
          </InputWithLabel>

        <hr/>
        {stories.isError && <p>Something went wrong ...</p>}
        {stories.isLoading ? (<p>Loading ...</p>)
         : (<List list={searchedStories} title="React eco system" onRemoveItem={handleRemoveStory} />)}
        
        {/* <List lists={jsLibs} title="JavaScript Libraries"/> */}
      </div>
    );
}
// Resuable input element
const InputWithLabel = ({
  id,
  value,
  type="text",
  onInputChange,
  isFocused,
  Children
}) => {
  const inputRef = React.useRef();
  React.useEffect(()=>{
    if(isFocused){
      inputRef.current.focus();
    }
  },[isFocused])
  return (
  <>
    <label htmlFor={id}>{Children}</label>
    &nbsp;
    <input 
      ref={inputRef}
      id={id} 
      type={type} 
      value={value} 
      onChange={onInputChange}
      autoFocus
      />
  </>
  )
};


export default App;