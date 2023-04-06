import * as React from 'react';

const List= (probs)=>{
  return (
    <div>
      <h3>{probs.title}</h3>
      <ul>
        { probs.lists.map(function (item){
          return (<Item key={item.objectID} item={item} />);
          }) 
        }
      </ul>
      {/**/}
    </div>
  );
}

const Item = (probs) =>{
  const item = probs.item;
  return (
    <li>
      <span>
        <a href={item.url} >{item.title}</a> &nbsp;&nbsp;
      </span>     <span>{item.author}</span>&nbsp;&nbsp;
      <span>{item.num_comments}</span>&nbsp;&nbsp;
      <span>{item.points}</span>
  </li>
  );
}


const Search=(probs)=>{
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event)=> {
      // console.log('Before: ${searchTerm}');
      setSearchTerm(event.target.value);
      // console.log('After:${searchTerm}');

      probs.onSearch(event);
  }
  return (
      <div>
        <label htmlFor='search'>Search </label>
        <input type="text" id="search" onChange={handleChange}></input>
        <p>
          search for <strong>{searchTerm}</strong>
        </p>
      </div>
      );
  }

const App = () => {

  const stories =[
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

  // const jsLibs =[
  //   {
  //     title: 'jQuery',
  //     url:'url/abc/db',
  //     author: 'Fayaz Nabi',
  //     num_comments: 4,
  //     points:4,
  //     objectID:1
  //   },
  //   {
  //     title: 'vuejs',
  //     url:'url/abc/db',
  //     author: 'Rohan Nido',
  //     num_comments: 3,
  //     points:2,
  //     objectID:7
  //   },
  //   {
  //     title: 'Angular',
  //     url:'url/abc/db',
  //     author: 'Google',
  //     num_comments: 3,
  //     points:2,
  //     objectID:2
  //   }
  // ] 
  const handleSearch = (event) => {
      console.log(event.target.value); 
  }
  
    return (
      <div>
        <h1>My Hacker Stories</h1>
        <Search onSearch={handleSearch}/>
        <hr/>
        <List lists={stories} title="React eco system"/>
        {/* <List lists={jsLibs} title="JavaScript Libraries"/> */}
      </div>
    );
}


export default App;