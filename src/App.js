import * as React from 'react';

function getTitle(title){
  return title;
}
function App(){
  return (
    <div>
      <h1>Hello {getTitle("Reactjs")}</h1>

      <label htmlFor='search'>Search </label>
      <input type="text" id="search"></input>
    </div>
  );
}

export default App;