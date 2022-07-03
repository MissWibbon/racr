import React, { useContext, useEffect, useState } from 'react'
import { RaceContext } from './appstate'
import {Redirect} from 'react-router-dom'
import { socket } from '../socket'
const ChallengeForm = (props) => {
    const {match} = props
    const context = useContext(RaceContext);
    
    const { isLoading, localUser, profile, race } = context;
    const minutes = useInput('')
    const miles = useInput('')
    const kilometers = useInput('')
    const message = useInput('')
    const [distanceRace, setDistanceRaceMetric] = useState(true)
    const [timeRace, setTimeRaceMetric] = useState(false)
    const [distanceIsActive, setDistanceActive] = useState(true)
    const [timeIsActive, setTimeActive] = useState(false)
    const [milesRace, setMilesRace] = useState(true)
    const [kmRace, setKmRace] = useState(false)
    const [challengeSent, sendChallenge] = useState(false)
    const [errMsg, showErrMsg] = useState(false)
    let goal = '';
    const uuidv4 = require("uuid/v4")    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (minutes.value > 0 ) {
            goal = {minutes: minutes.value}
        }
        else if (miles.value > 0) {
            goal = {miles: miles.value}
        }
        else if (kilometers.value > 0) {
            goal = {kilometers: kilometers.value}
        }
//        if(minutes.value == "" && miles.value == "" && kilometers.value == "") {
        if(goal === "") {
        //console.log('nothing entered')
            showErrMsg(true)
        } else {
            showErrMsg(false)
            //console.log('challenged')
            const body = {
                raceId: uuidv4(),
                timestamp: Date.now(),
                status: "pending",
                requestor: localUser._id,
                requestorName: localUser.userName,
                requestorImage: localUser.image,
                requestorCountry: localUser.country,
                requestorCountryCode: localUser.countryCode,
                currentRequestorDist: '',
                currentRequestorSpeed: '',
                acceptor: profile._id,
                acceptorName: profile.userName,
                acceptorImage: profile.image,
                acceptorCountry: profile.country,
                acceptorCountryCode: profile.countryCode,
                currentAcceptorDist: '',
                currentAcceptorSpeed: '',
                message: message.value,
                minutes: minutes.value,
                kilometers: kilometers.value,
                miles: miles.value,
                goal: goal,
                winner: '',
                loser: ''
            }
            socket.emit('challenge', body)
            const jwt = window.localStorage.getItem('token');
            localStorage.setItem('liveRace', JSON.stringify(body))
            let friendJson = JSON.parse(jwt)
            friendJson.races.push(body)
    
            console.log(body)
            console.log('--------')
            sendChallenge(true)
        }
    }

    useEffect(() =>{

    })

    return (

        <div id="challengeModal">

        {
            race
            ?
            (
                <Redirect to = '/racetest' />
            )
            : (

        <>
        {isLoading
        ?(
            <div className="challenge-form">
                <div className="challenge-label challengeMetric">Challenge <span className="profileUserName">{profile.userName}</span> to a <button className={distanceIsActive ? "activeMetric" : "deactiveMetric"} onClick={() => {setDistanceRaceMetric(true); setTimeRaceMetric(false); setDistanceActive(true); setTimeActive(false);}}>Distance</button> or <button className={timeIsActive ? "activeMetric" : "deactiveMetric"} onClick={() => {setDistanceRaceMetric(false); setTimeRaceMetric(true); setTimeActive(true); setDistanceActive(false)}}>Time</button> race.</div>
                {timeRace ? 
                <div className="timeMetricInputs">
                    <div className="timewrap">
                        <label>Minutes:</label>
                        <input type="number" min="0" max="300" onChange={ miles.value = '', kilometers.value = ''} {...minutes}></input>
                    </div>
                </div>
                : ''
                }
                <hr></hr>
                {distanceRace ?
                <div className="distanceMetricInputs">
                    <div className="distanceMetric">
                        <button className={milesRace ? "activeMetric" : "deactiveMetric"} onClick={() => {setMilesRace(true); setKmRace(false)}}>Miles</button>
                        <button className={kmRace ? "activeMetric" : "deactiveMetric"} onClick={() => {setKmRace(true); setMilesRace(false)}}>Kilometers</button>
                    </div>
                    {milesRace ?                     
                        <div className="timewrap">
                            <label>Miles:</label>
                            <input type="number" min="0" max="42" onChange={kilometers.value = '', minutes.value = ''} {...miles}></input>
                        </div>              
                    : ''}
                    {kmRace ?
                        <div className="timewrap">
                            <label>Kilometers:</label>
                            <input type="number" min="0" max="26" onChange={miles.value = '', minutes.value = ''} {...kilometers}></input>
                        </div>              
                    : ''}
                </div>
                : ''    
                }
                <div className="challenge-label">Message:</div>
                <input  {...message}placeholder="Your Message" className="challenge-message" maxlength="50"></input>               
                <button id="submitButton" onClick ={handleSubmit}>Send Challenge</button>
                {errMsg ?
                <div className="error-input">Set a distance or time challenge value to challenge {profile.userName}</div>
                : ''}
                {challengeSent ?
                <div className="challenge-sent-success">Challenge Sent!</div>
                : ''}
            </div>
        ):
        <h2>Loading...</h2>
        }
        </>
            )

        }

        </div>
    )
}

const useInput = (initialValue) => {

    const [value, setValue] = useState(initialValue)

    const handlevaluechange = (e) => {
        setValue(e.target.value)
    }

    return {
        value,
        onChange: handlevaluechange
    }
}

const useSearchValue = (initialValue) => {
    const [userState, setUserState] = useState(initialValue);
    const handlevaluechange = (e) => {
        setUserState(e.target.value);
    }
    return {
        value: userState,
        onChange: handlevaluechange,

    }
}
export default ChallengeForm