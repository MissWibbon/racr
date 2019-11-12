import React from 'react';
import {BrowserRouter, Route, NavLink, Redirect, Switch} from 'react-router-dom'
import Landing from './components/landing'
import Home from './components/home'
import Navbar from './components/Navbar'
import SignUp from './components/profile'
import './styles/main.scss';
function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Switch>
        <Route to path = '/login' component ={Landing}/>
        <Route to path = '/home' component ={Home}/>
        <Route to path = '/signup' component={SignUp}/>
        <Route to exact path = '/' render= {()=><Redirect to ='/login'/>}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
