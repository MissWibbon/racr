import React ,{useContext} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import Landing from './components/landing'
import Home from './components/home'
import Navbar from './components/Navbar'
import SignUp from './components/profile'
import User from './components/user'
import FriendPool from './components/friendpool'
import Countdown from './components/countdown'
import ChallengeForm from './components/challengeForm'
import './styles/main.scss';
import{RaceContext} from './components/appstate'
import io from 'socket.io-client';
import Demo from './components/geolocation';
const socket = io('http://localhost:5000');

function App() {
  const context = useContext(RaceContext);
  const {localUser} = context
  socket.on('some event', function(data){
    console.log(data)
});
  socket.on('welcome', function(data){
    console.log('made it')
});
socket.on('ask', () =>{
   if (localUser === undefined){
    return false
   }else{
   
     socket.emit('online', {localUser})
  }
})
socket.on('event', data =>{
  console.log(data)
})
socket.on('disconnect', function(){});
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Switch>
        <Route to exact path = '/login' component ={Landing}/>
        <Route to exact path = '/users/:id/challengeform' component ={ChallengeForm}/>
        <Route to exact path = '/home' component ={Home}/>
        <Route to exact path = '/signup' component={SignUp}/>
        <Route to exact path = '/race' component={Countdown}/>
        <Route to exact path = '/users' component={FriendPool}/>
        <Route to path = '/users/:id' component={User}/>
        <Route to exact path = '/' render= {()=><Redirect to ='/login'/>}/>
        <Route to exact path = '/racetest' component={Demo}/>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
