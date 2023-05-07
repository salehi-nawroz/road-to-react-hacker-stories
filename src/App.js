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

  const [stories, setStories] = React.useState(initialStories);

  const handleRemoveStory = item => {
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    );
    setStories(newStories);
  }

  
  const handleSearch = (event) => {
      setSearchTerm(event.target.value);
      console.log(event.target.value); 
  }

  const searchedStories = stories.filter((story) => {
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
        <List list={searchedStories} title="React eco system" onRemoveItem={handleRemoveStory} />
        {/* <List lists={jsLibs} title="JavaScript Libraries"/> */}
      </div>
    );
}

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