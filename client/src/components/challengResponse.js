import React, {useContext, useEffect, useState}from 'react'
import {RaceContext} from './appstate'

const ChallengeResponse = ({match}) =>{
    
    const context = useContext(RaceContext);
    const {id} = match.params
    const {users, isLoading, localUser, profile} = context
    const metric = useInput ('miles')
    const number = useInput('')
    const message = useInput('')
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            requestor: localUser._id ,
            acceptor: profile._id,
            distance: number.value,
            metric: metric.value,
            message: message.value,
            acceptor: id

        }
        console.log( body)
    }

 
    return(
        
        <div id="challengeModal">
        {isLoading
        ?(
            <div className="challenge-response">
                <div className="challenge-label">You have been invited to race against
                <div className="opponentName">{requestor}</div>
                in a <div className="distance">{metric}</div> race</div>
                <button id="submitButton" className="accept-race" onClick ={handleSubmit}>Accept</button>
                <button id="submitButton" className="decline-race" onClick ={handleSubmit}>Decline</button>
            </div>
        ):
        <h2>Loading...</h2>
        }
        </div>
    )
}


export default ChallengeResponse