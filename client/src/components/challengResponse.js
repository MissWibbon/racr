import React, {useContext, useEffect, useState}from 'react'
import ChallengeForm from './challengeForm'
import {RaceContext} from './appstate'

const ChallengeResponse = ({match}) =>{
    
    const context = useContext(RaceContext);
    const {id} = match.params
    const {users, isLoading, localUser, profile} = context
    
    console.log(context)
    

 
    return(
        
        <div id="challengeModal">
        {isLoading
        ?(
            <div className="challenge-response">
                <div className="challenge-label">You have been invited to race against
                <div className="opponentName"></div>
                in a <div className="distance"></div> race</div>
                <button id="submitButton" className="accept-race" onClick ="#">Accept</button>
                <button id="submitButton" className="decline-race" onClick ="#">Decline</button>
            </div>
        ):
        <h2>Loading...</h2>
        }
        </div>
    )
}


export default ChallengeResponse