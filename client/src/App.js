import React ,{useContext} from 'react';
import {BrowserRouter, Route, Redirect, Switch , withRouter } from 'react-router-dom'
import Landing from './components/landing'
import Home from './components/home'
import Navbar from './components/Navbar'
import SignUp from './components/profile'
import User from './components/user'
import FriendPool from './components/friendpool'
import Countdown from './components/countdown'
import ChallengeForm from './components/challengeForm'
import Logout from './components/logout'
import './styles/main.scss';
import{RaceContext} from './components/appstate'
import ChallengeResponse from './components/challengResponse'
import io from 'socket.io-client';
import Demo from './components/geolocation';

// import ChallengeResponse from './components/challengResponse';
const socket = io('https://mernracr.herokuapp.com/');

function App(props) {
  const context = useContext(RaceContext);
  const {localUser, notifications, setNotifications ,setStamp} = context;
  

  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Switch>
        <Route to exact path = '/login' component ={Landing}/>
        <Route to exact path = '/users/:id/challengeform' component ={ChallengeForm}/>
        <Route to exact path = '/home' component ={Home}/>
        <Route to exact path = '/signup' component={SignUp}/>
        <Route to exact path = '/race' component={Countdown}/>
        <Route to exact path = '/racetest' component={Demo}/>
        <Route to exact path = '/notifications' render ={(props) => <ChallengeResponse {...props} data = {notifications}/>}/>
        <Route to exact path = '/friends' component={FriendPool}/>
        <Route to path = '/users/:id' component={User}/>
        <Route to exact path = '/' render= {()=><Redirect to ='/login'/>}/>
        <Route to exact path = '/logout' render ={(props) => <Logout {...props}/>}/>
        <Route to exact path = '/racetest' component={Demo}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
