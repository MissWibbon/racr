import React, { Component, useContext, useEffect, useState } from 'react'
import { RaceContext } from './appstate'
import io from 'socket.io-client';
// const socket = io('https://mernracr.herokuapp.com');
import { socket } from '../socket'


const Demo = (props) => {
    let dist = 0;
    var R = 6371e3; // metres
    const context = useContext(RaceContext)
    const {room, localUser , stats} =context;
    const [state, setState] = useState({
        lat1: 0,
        lat2:0,
        latdiff: 0 ,
        long: 0,
        longdiff: 0,
        a: null,
        c: null,
        d: 0,
        dist: 0,

        oppPos: stats.distance || 0
    })
    const [oppID , setOppId] = useState(stats.oppID)

    useEffect(() => {
      
        // socket.emit('startrace', { msg: 'just started' })
        navigator.geolocation.getCurrentPosition(function (position) {
            setState({
                lat1: position.coords.latitude,
                long1: position.coords.longitude,

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
                        lat2: position.coords.latitude,
                        latdiff: Math.abs(state.lat2.value-state.lat1.value),
                        long1:prevState.long1,
                        long2: position.coords.longitude,
                        longdiff: Math.abs(state.long2-state.long1),
                        a: Math.sin(state.latdiff/2) * Math.sin(state.latdiff/2) +
                        Math.cos(state.lat2) * Math.cos(state.lat2) *
                        Math.sin(state.longdiff/2) * Math.sin(state.longdiff/2),
                        c: 2 * Math.atan2(Math.sqrt(state.a), Math.sqrt(1-state.a)),
                        d: R * state.c,
                        dist: prevState.d += state.d
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
                            <label>Latitude: </label><p className="lat">{state.lat2} </p><label>Longitude: </label><p className="long">{state.long2} </p><label>Distance: </label><p className="dist">{state.dist}</p>
                            <label>Opposition Distnce: </label><p className="lat">{state.oppPos} </p>
                        </div>
                    )
                    : null
            }
        </div>
    )
}

export default Demo