import React, { useContext, useEffect, useState } from 'react'
import { RaceContext } from './appstate'
import  {Link} from 'react-router-dom'
import API from '../utils/API'
import io from 'socket.io-client';
// const socket = io('https://mernracr.herokuapp.com');
import { socket } from '../socket'

const NotifyCard = (props) =>{
    const context = useContext(RaceContext)
    const {localUser, setStats} = context
    const [player, setPlayer] = useState({})

    useEffect(() => {
        
            API.getOneUser(props.data.requestor)
                .then(res => {
                    setPlayer(res.data)
                })


    }, [])
    
    const accept = () =>{
        setStats(props.data) 
       socket.emit('accepted',props.data)
        props.history.push('/racetest')
    }


    return(
        <div className="challenge-response">
        
        <div className="challenge-label"><img className="challengePlayerImg" src={player.image}/><Link className="opponentName" to ={`users/${props.data.requestor}`}>@{player.userName} </Link> has challenged you to race for 
            <div className="timechallenge">{props.data.hours}, {props.data.minutes}, {props.data.seconds}</div>
            <div className="distance">{props.data.miles}, {props.data.kilometers}</div>
        </div>
        <div className="message">Their message to you: {props.message}</div>
        <div className="responseButtonWrap">
            <button id="responseButton" className="accept-race" onClick={accept}>Accept</button>
            <button id="responseButton" className="decline-race"><a href="/home">Decline</a></button>
        </div>
    </div>
    )
}

export default NotifyCard