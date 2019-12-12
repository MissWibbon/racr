import React, { Component, useContext, useEffect, useState } from 'react'
import { RaceContext } from './appstate'
import io from 'socket.io-client';
// const socket = io('https://mernracr.herokuapp.com');
import { socket } from '../socket'
import { set } from 'mongoose';

const Demo = (props) => {
    let dist = 0;
    var R = 6371e3; // metres
    const context = useContext(RaceContext)
    const {room, localUser , stats} =context;
    const [state, setState] = useState({
        lat1: 0,
        lat2:0,
        latdiff: 0,
        
        long: 0,
        dist: 0,
        oppPos: stats.distance || 0
    })
    const [oppID , setOppId] = useState(stats.oppID)

    useEffect(() => {
      
        // socket.emit('startrace', { msg: 'just started' })
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
        const news = {...stats,
            distance: state.dist,
            oppID: stats.oppID
        }
        console.log(news)
        socket.emit('status', news);

    },[state.lat , state.long])
    //navigator.geolocation.watchPosition(console.log(this.props.coords.latitude)),
    //Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
    const distance = () => {
        var watchID = navigator.geolocation.watchPosition(function (position) {
            setState(prevState =>
                (
                    {
                        lat1: prevState.lat2,
                        lat2:position.coords.latitude,
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
                        <div className="raceCard">
                            <label>Latitude: </label><p className="lat">{state.lat} </p><label>Longitude: </label><p className="long">{state.long} </p><label>Distance: </label><p className="dist">{state.dist}</p>
                            <label>Opposition Distnce: </label><p className="lat">{state.oppPos} </p>
                        </div>
                    )
                    : null
            }
        </div>
    )
}

export default Demo