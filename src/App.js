import * as React from 'react';


const lists =[
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
    author: 'Ahmad alizada2',
    num_comments: 3,
    points:2,
    objectID:2
  },
  {
    title: 'vuex',
    url:'url/abc/db',
    author: 'Ahmad alizada3',
    num_comments: 3,
    points:2,
    objectID:2
  }
] 
function App(){
  return (
    <div>
      <h1>My Hacker Stories</h1>

      <label htmlFor='search'>Search </label>
      <input type="text" id="search"></input>
      <hr/>

      <ul>
        { lists.map(function (item){
          return (
                     <li key={item.objectID}>
                        <span>
                          <a href={item.url} >{item.title}</a>
                        </span>
                        <span>{item.author}</span>
                        <span>{item.num_comments}</span>
                        <span>{item.points}</span>
                     </li>
                     
                );
          }) 
         }
      </ul>
      {/**/}
    </div>
  );
}

export default App;