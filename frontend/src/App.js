import React from 'react';
import {BrowserRouter, Route, NavLink, Switch} from 'react-router-dom'
import Landing from './landing'
import Home from './home'
import SignUp from './profile'
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route to exact path = '/' component ={Landing}/>
        <Route to exact path = '/home' component ={Home}/>
        <Route to exact path = '/signup' component={SignUp}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;