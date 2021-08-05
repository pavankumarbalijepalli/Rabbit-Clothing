import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Route } from 'react-router-dom';

const LinkPage = (props) => {
  return(
    <div>
      <h1>This is {props.match.params.val} page</h1>
    </div>
  )
}

function App() {
  return (
    <div>
      <Route exact path='/' component={HomePage}/>
      <Route exact path='/shop/:val' component={LinkPage}/>
    </div>
  );
}

export default App;
