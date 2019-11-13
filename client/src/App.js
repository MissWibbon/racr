import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import Landing from './components/landing'
import Home from './components/home'
import Navbar from './components/Navbar'
import SignUp from './components/profile'
import User from './components/user'
import './styles/main.scss';
function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Switch>
        <Route to exact path = '/login' component ={Landing}/>
        <Route to exact path = '/home' component ={Home}/>
        <Route to exact path = '/signup' component={SignUp}/>
        <Route to path = '/users/:id' component={User}/>
        <Route to exact path = '/' render= {()=><Redirect to ='/login'/>}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
