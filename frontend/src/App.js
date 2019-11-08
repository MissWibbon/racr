import React from 'react';
import {BrowserRouter, Route, NavLink, Switch} from 'react-router-dom'
import Landing from './landing'
import Home from './home'
<<<<<<< HEAD
import SignUp from './profile'
import './styles/main.scss';
=======

import './styles/main.scss';

import SignUp from './profile'

>>>>>>> 8b1e39691d11d0041d3083b717dda062a4dc9059
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
