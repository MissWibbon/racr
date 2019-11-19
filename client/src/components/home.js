import React, {useContext, useEffect} from 'react'
import LocalUser from './localUser'
import {RaceContext} from './appstate';


const Home =(props) =>{
    const context = useContext(RaceContext);
  
    const {isOnline, setOnline, isAuth, localUser} = context
  
     
    // socket.emit('news', function (data) {
    //     console.log(data);
    //     socket.on('my other event', { my: 'data' });
    //   });
    //   socket.on('disconnect', function(){});
    return(
        <LocalUser {...props}></LocalUser>
    )
}
export default Home