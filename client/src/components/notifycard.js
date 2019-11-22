import React, { useContext, useEffect, useState } from 'react'
import { RaceContext } from './appstate'
import  {Link} from 'react-router-dom'
import API from '../utils/API'
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

const NotifyCard = (props) =>{
    const context = useContext(RaceContext)
    const {localUser, setRoom} = context
    const [player, setPlayer] = useState({})

    useEffect(() => {
        
            API.getOneUser(props.data.requestor)
                .then(res => {
                    setPlayer(res.data)
                })


    }, [])
    
    const accept = () =>{
       socket.emit('accepted',props.data)
       setRoom(`${props.data.acceptor}-${props.data.requestor}`)
        props.history.push('/racetest')
    }


    return(
        <div className="challenge-response">
        
        <div className="challenge-label"><img className="challengePlayerImg" src={player.image}/><Link className="opponentName" to ={`users/${props.data.requestor}`}>@{player.userName} </Link> has challenged you to race for 
            <div className="distance">{props.data.hours} Hour, {props.data.minutes} minute, {props.data.seconds} seconds</div>
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