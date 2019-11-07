import React from 'react';
import {BrowserRouter, Route, NavLink, Switch} from 'react-router-dom'
import Landing from './landing'
import Home from './home'
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route to exaxt path = '/' component ={Landing}/>
        <Route to exaxt path = '/home' component ={Home}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
