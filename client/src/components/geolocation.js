import React, { Component, useContext, useEffect, useState } from 'react'
import { RaceContext } from './appstate'

import { geolocated } from "react-geolocated";
import { stat } from 'fs';

// function calcDistance() {
//     feet = 1;
//     mile = feet * 5280.00016896;
//     kilometer = feet * 3280.84;
// }


const Demo = (props) => {
    let dist = 0;
    const [state, setState] = useState({
        lat: 0,
        long: 0,
        dist: 0
    })


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setState({
                lat: position.coords.latitude,
                long: position.coords.longitude,
                dist: 0
            });
        });
        distance()
    }, [])
    //navigator.geolocation.watchPosition(console.log(this.props.coords.latitude)),
    //Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
    const distance = () => {
        var watchID = navigator.geolocation.watchPosition(function (position) {
            setState(prevState =>
                (
                    {
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                        dist: prevState.dist += Math.sqrt(Math.pow((prevState.lat - position.coords.latitude), 2) + Math.pow((prevState.long - position.coords.longitude), 2))
                    }))
        });


    }
    console.log(state)
    return (
        <div>
            {
                "geolocation" in navigator
                    ?
                    (
                        <>
                            <p>{state.lat}</p><p>{state.long}</p><p>{state.dist * 50}</p>
                        </>
                    )
                    : null
            }
        </div>
    )
}

export default Demo