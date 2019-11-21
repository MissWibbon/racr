import React, { useContext, useEffect, useState } from 'react'
import { RaceContext } from './appstate'
import io from 'socket.io-client';
const socket = io('http://localhost:5000');
const ChallengeForm = ({ match }) => {

    const context = useContext(RaceContext);

    const {id} = match.params
    const {users, isLoading, localUser, profile} = context
    const hours = useInput('hour')
    const minutes = useInput('minute')
    const seconds = useInput('second')
    const message = useInput('')

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            requestor: localUser._id,
            acceptor: profile._id,
            hours: hours.value,
            minutes: minutes.value,
            seconds: seconds.value,
            message: message.value,
            acceptor: id

        }
        socket.emit('challenge', { body })

        console.log(body)
        console.log('--------')
        console.log(body[0])
    }


    return (

        <div id="challengeModal">
        {isLoading
        ?(
            <div className="challenge-form">
                <div className="challenge-label">Length of time for race competition: </div>
                <div className="timewrap"><label>Hours:</label><input type="number" {...hours}></input></div>
                <div className="timewrap"><label>Minutes:</label><input type="number" {...minutes}></input></div>
                <div className="timewrap"><label>Seconds:</label><input type="number" {...seconds}></input></div>              
                <div className="challenge-label">Message:</div>
                <input  {...message}placeholder="Your Message" className="challenge-message"></input>               
                <button id="submitButton" onClick ={handleSubmit}>Send Challenge</button>
            </div>
        ):
        <h2>Loading...</h2>
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