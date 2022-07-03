import React, { useContext, useEffect, useState } from 'react'
import { RaceContext } from './appstate'
// const socket = io('https://mernracr.herokuapp.com');
import { socket } from '../socket'

const Demo = ({ props, match }) => {
    var R = 6371e3; // metres
    const context = useContext(RaceContext)
    const { stats, localUser, reqStats, accStats } = context;
    //const acceptorID = liveRace[0].acceptor
    //const [acceptorName, setAcceptorName] = useState(props.location.acceptorName)
    //const [requestorName, setRequestorName] = useState(props.location.requestorName)
    //const requestorID = liveRace[0].requestor
    var date = new Date()
    const monthDay = date.getDate()
    const month = date.getMonth()
    const hour = date.getHours()
    const year = date.getFullYear()
    const minuteStart = date.getMinutes()
    const secondStart = date.getSeconds()
    const [metric, setMetric] = useState('miles')
    const [goalVal, setGoalVal] = useState(0)
    const [meterVal, setMeterVal] = useState(0)
    const [acceptorDistance, setAcceptorDistance] = useState(0)
    const [requestorDistance, setRequestorDistance] = useState(0)
    const [distArray, setDistArray] = useState([])
    const [accepted, setAccepted] = useState(false)
    const [requested, setRequested] = useState(false)
    const [requestorState, setRequestorState] = useState({
        lat1: 0,
        lat2: 0,
        latdiff: 0,
        long1: 0,
        long2: 0,
        longdiff: 0,
        φ1: 0,
        φ2: 0,
        Δφ: 0,
        Δλ: 0,
        a: null,
        c: null,
        d: 0,
        dist: 0,
        time: 0
    })
    const [acceptorState, setAcceptorState] = useState({
        lat1: 0,
        lat2: 0,
        latdiff: 0,
        long1: 0,
        long2: 0,
        longdiff: 0,
        φ1: 0,
        φ2: 0,
        Δφ: 0,
        Δλ: 0,
        a: null,
        c: null,
        d: 0,
        dist: 0,
        time: 0
    })
    const [geoState, setGeoState] = useState({
        lat1: 0,
        lat2: 0,
        latdiff: 0,
        long1: 0,
        long2: 0,
        longdiff: 0,
        φ1: 0,
        φ2: 0,
        Δφ: 0,
        Δλ: 0,
        a: null,
        c: null,
        d: 0,
        dist: 0,
        time: 0
    })

    const handleLoad = () => {
        if (stats.acceptor === localUser._id) { setAccepted(true); setAcceptorState(geoState) }
        if (stats.requestor === localUser._id) { setRequested(true); setRequestorState(geoState)}
        if (stats.minutes !== "") {
            setMetric("minutes");
            setGoalVal(stats.minutes)
        }
        if (stats.miles !== "") {
            setMetric("miles");
            setGoalVal(stats.miles)
            setMeterVal(goalVal * 1609)
        }
        if (stats.kilometers !== "") {
            setMetric("kilometers");
            setGoalVal(stats.kilometers)
            setMeterVal(goalVal * 1000)
        }

    }
    useEffect(() => {

        // socket.emit('startrace', { msg: 'just started' })
        navigator.geolocation.getCurrentPosition(function (position) {
            setGeoState({
                lat2: position.coords.latitude,
                long2: position.coords.longitude,
                dist: 0,
                time: position.timestamp
                
            });
            console.log(geoState)
            if (accepted) {
                setAcceptorState({
                    lat2: position.coords.latitude,
                    long2: position.coords.longitude,
                    dist: 0,
                    time: position.timestamp

                });
                console.log(acceptorState)
                socket.emit('acceptorstats', accStats)
            }
            if (requested) {
                setRequestorState({
                    lat2: position.coords.latitude,
                    long2: position.coords.longitude,
                    dist: 0,
                    time: position.timestamp

                });
                console.log(requestorState)
                socket.emit('acceptorstats', reqStats)
            }
        });

        distance()
    }, [])


    const distance = () => {
        var watchID = navigator.geolocation.watchPosition(function (position) {

            setGeoState(prevState =>
            (
                {
                    lat1: prevState.lat2,
                    lat2: position.coords.latitude,
                    long1: prevState.long2,
                    long2: position.coords.longitude,
                    φ1: prevState.lat2 * Math.PI / 180, // φ, λ in radians
                    φ2: position.coords.latitude * Math.PI / 180,
                    Δφ: (position.coords.latitude - prevState.lat2) * Math.PI / 180,
                    Δλ: (position.coords.longitude - prevState.long2) * Math.PI / 180,
                    a: Math.sin((position.coords.latitude - prevState.lat2) * Math.PI / 180 / 2) * Math.sin((position.coords.latitude - prevState.lat2) * Math.PI / 180 / 2) +
                        Math.cos(prevState.lat2 * Math.PI / 180) * Math.cos(position.coords.latitude * Math.PI / 180) *
                        Math.sin((position.coords.longitude - prevState.long2) * Math.PI / 180 / 2) * Math.sin((position.coords.longitude - prevState.long2) * Math.PI / 180 / 2),
                    c: 2 * Math.atan2(Math.sqrt(Math.sin((position.coords.latitude - prevState.lat2) * Math.PI / 180 / 2) * Math.sin((position.coords.latitude - prevState.lat2) * Math.PI / 180 / 2) +
                        Math.cos(prevState.lat2 * Math.PI / 180) * Math.cos(position.coords.latitude * Math.PI / 180) *
                        Math.sin((position.coords.longitude - prevState.long2) * Math.PI / 180 / 2) * Math.sin((position.coords.longitude - prevState.long2) * Math.PI / 180 / 2)), Math.sqrt(1 - Math.sin((position.coords.latitude - prevState.lat2) * Math.PI / 180 / 2) * Math.sin((position.coords.latitude - prevState.lat2) * Math.PI / 180 / 2) +
                            Math.cos(prevState.lat2 * Math.PI / 180) * Math.cos(position.coords.latitude * Math.PI / 180) *
                            Math.sin((position.coords.longitude - prevState.long2) * Math.PI / 180 / 2) * Math.sin((position.coords.longitude - prevState.long2) * Math.PI / 180 / 2))),
                    d: R * (2 * Math.atan2(Math.sqrt(Math.sin((position.coords.latitude - prevState.lat2) * Math.PI / 180 / 2) * Math.sin((position.coords.latitude - prevState.lat2) * Math.PI / 180 / 2) +
                        Math.cos(prevState.lat2 * Math.PI / 180) * Math.cos(position.coords.latitude * Math.PI / 180) *
                        Math.sin((position.coords.longitude - prevState.long2) * Math.PI / 180 / 2) * Math.sin((position.coords.longitude - prevState.long2) * Math.PI / 180 / 2)), Math.sqrt(1 - Math.sin((position.coords.latitude - prevState.lat2) * Math.PI / 180 / 2) * Math.sin((position.coords.latitude - prevState.lat2) * Math.PI / 180 / 2) +
                            Math.cos(prevState.lat2 * Math.PI / 180) * Math.cos(position.coords.latitude * Math.PI / 180) *
                            Math.sin((position.coords.longitude - prevState.long2) * Math.PI / 180 / 2) * Math.sin((position.coords.longitude - prevState.long2) * Math.PI / 180 / 2)))),
                    dist: prevState.dist + (R * (2 * Math.atan2(Math.sqrt(Math.sin((position.coords.latitude - prevState.lat2) * Math.PI / 180 / 2) * Math.sin((position.coords.latitude - prevState.lat2) * Math.PI / 180 / 2) +
                        Math.cos(prevState.lat2 * Math.PI / 180) * Math.cos(position.coords.latitude * Math.PI / 180) *
                        Math.sin((position.coords.longitude - prevState.long2) * Math.PI / 180 / 2) * Math.sin((position.coords.longitude - prevState.long2) * Math.PI / 180 / 2)), Math.sqrt(1 - Math.sin((position.coords.latitude - prevState.lat2) * Math.PI / 180 / 2) * Math.sin((position.coords.latitude - prevState.lat2) * Math.PI / 180 / 2) +
                            Math.cos(prevState.lat2 * Math.PI / 180) * Math.cos(position.coords.latitude * Math.PI / 180) *
                            Math.sin((position.coords.longitude - prevState.long2) * Math.PI / 180 / 2) * Math.sin((position.coords.longitude - prevState.long2) * Math.PI / 180 / 2))))),
                    time: position.timestamp

                })
            )
            if(accepted) {setAcceptorState(geoState)}
            if(requested) {setRequestorState(geoState)}
        })
    }


    useEffect(handleLoad)
    console.log(requestorState)
    console.log(acceptorState)
    return (
        <div className="racePage">
            {
                "geolocation" in navigator
                    ?
                    (
                        <div className="raceCard">
                            <div className="timestamp">{month + 1}/{monthDay}/{year} {hour > 12 ? hour - 12 : hour}:{minuteStart.length < 2 ? "0" + minuteStart : minuteStart}{hour > 12 ? "PM" : "AM"}</div>
                            <div className="opponents-wrap">
                                <span className="requestor player-name">{stats.requestorName}</span> vs.
                                <span className="acceptor player-name"> {stats.acceptorName}</span>
                            </div>
                            <div><label>Goal: </label>{goalVal} {metric} <i>{meterVal} meters</i></div>
                            <div><label>Lat: </label><p className="lat">{geoState.lat2}</p></div>
                            <div><label>Long: </label><p className="long">{geoState.long2}</p></div>
                            <div><label>Distance: </label><p className="dist">{geoState.dist}</p></div>
                            <div><label>D: </label><p className="dist">{geoState.d}</p></div>
                            <div className="distarray">{distArray.reduce((a, b) => a + b, 0)}</div>
                            <div className="race-log">
                                {metric === "minutes" ?
                                    <>
                                        <div className="player-progress requestor-player">
                                            <div className="player-img"><div className="usersImgSrc" style={{ backgroundImage: "url(" + stats.requestorImage + ")" }}></div></div>
                                            <label>{stats.requestorName}: {Math.round((acceptorState.dist + Number.EPSILON) * 100) / 100} meters</label>
                                            <div className="player-distance-minutes">{requestorDistance} meters</div>
                                        </div>
                                        <hr></hr>
                                        <div className="player-progress acceptor-player">
                                            <div className="player-img"><div className="usersImgSrc" style={{ backgroundImage: "url(" + stats.acceptorImage + ")" }}></div></div>
                                            <label>{stats.acceptorName}: {Math.round((acceptorState.dist + Number.EPSILON) * 100) / 100} meters</label>
                                            <div className="player-distance-minutes">{acceptorDistance} meters</div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="player-progress requestor-player">
                                            <div className="player-img"><div className="usersImgSrc" style={{ backgroundImage: "url(" + stats.requestorImage + ")" }}></div></div>
                                            <span>{stats.requestorName}: {Math.round((requestorState.dist + Number.EPSILON) * 100) / 100} meters</span>
                                            <input type="range" min="0" max={meterVal} value={requestorState.dist} className="slider" id="requestorRange" />
                                        </div>
                                        <hr></hr>
                                        <div className="player-progress acceptor-player">
                                            <div className="player-img"><div className="usersImgSrc" style={{ backgroundImage: "url(" + stats.acceptorImage + ")" }}></div></div>
                                            <span>{stats.acceptorName}: {Math.round((acceptorState.dist + Number.EPSILON) * 100) / 100} meters</span>
                                            <input type="range" min="0" max={meterVal} value={acceptorState.dist} className="slider" id="acceptorRange" />
                                        </div>
                                    </>
                                }
                            </div>
                            {requested ? (<div>{requestorDistance}</div>) : ''}
                            {accepted ? (<div>{acceptorDistance}</div>) : ''}
                        </div>
                    )
                    : null
            }
        </div>
    )
}

export default Demo