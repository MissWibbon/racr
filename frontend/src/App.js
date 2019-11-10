import React from 'react';
import {BrowserRouter, Route, NavLink, Redirect, Switch} from 'react-router-dom'
import Landing from './landing'
import Home from './home'
import SignUp from './profile'
import './styles/main.scss';
function App() {
  return (
    <BrowserRouter>
    <NavBar></NavBar>
      <Switch>
        <Route to exact path = '/login' component ={Landing}/>
        <Route to exact path = '/home' component ={Home}/>
        <Route to exact path = '/signup' component={SignUp}/>
        <Route to exact path = '/' render= {()=><Redirect to ='/login'/>}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
