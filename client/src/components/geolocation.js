import React, { Component, useContext, useEffect, useState } from 'react'
import { RaceContext } from './appstate'
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

const Demo = (props) => {
    let dist = 0;
    const context = useContext(RaceContext)
    const {room, localUser} =context;
    const [state, setState] = useState({
        lat: 0,
        long: 0,
        dist: 0
    })


    useEffect(() => {
        socket.emit('startrace', { msg: 'just started' })
        navigator.geolocation.getCurrentPosition(function (position) {
            setState({
                lat: position.coords.latitude,
                long: position.coords.longitude,
                dist: 0
            });
        });
        distance()
    }, [])

    useEffect(() =>{
        socket.emit('status', {
            id: localUser._id,
            distance: dist
        });

    },[dist])
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
        <div className="racePage">
            {
                "geolocation" in navigator
                    ?
                    (
<<<<<<< HEAD
                        <>
                            <p>{state.lat}</p><p>{state.long}</p><p>{state.dist * 50}</p>
                        </>
=======
                        <div className="raceCard">
                            <label>Latitude: </label><p className="lat">{state.lat} </p><label>Longitude: </label><p className="long">{state.long} </p><label>Distance: </label><p className="dist">{state.dist}</p>
                        </div>
>>>>>>> 5a1c9ef6d6218c341c2c0717ba1a5bde6fb6497b
                    )
                    : null
            }
        </div>
    )
}

export default Demo