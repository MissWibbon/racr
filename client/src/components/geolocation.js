import React, {Component, useContext, useEffect, useState}from 'react'
import {RaceContext} from './appstate'

import { geolocated } from "react-geolocated";
 
// function calcDistance() {
//     feet = 1;
//     mile = feet * 5280.00016896;
//     kilometer = feet * 3280.84;
// }
 

const Demo = () => {
    
    const [state, setState] = useState(0) 
   

    useEffect(() =>{
       distance()
    },[])
    //navigator.geolocation.watchPosition(console.log(this.props.coords.latitude)),
    //Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
    const distance = () => {
        var watchID = navigator.geolocation.watchPosition(function(position) {
            setState(prevState =>(
                {
                    lat:position.coords.latitude, 
                    long: position.coords.longitude
                }))
          });
            
   
    }
    console.log(state)
    return(
        <div>
            {
                "geolocation" in navigator
                ?
                (
                    <>
                    <p>{state.lat}</p><p>{state.long}</p>
                    </>
                )
                : null
            }
        </div>
    )
}

export default Demo