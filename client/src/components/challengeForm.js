import React, {useContext, useEffect, useState}from 'react'
import {RaceContext} from './appstate'
const ChallengeForm = ({match}) =>{
    const context = useContext(RaceContext);

    const {id} = match.params
    const {users, isLoading, profile} = context

    useEffect(() =>{
        context.fetchOneUser(id)
    },[])
    return(
        
        <div id="challengeModal">
        {isLoading
        ?(
            <div className="challenge-form">
                <div>Race Against</div>
                <div className="challenge-profile-user">{`${profile.userName}` }</div>
                <div className="challenge-label">Schedule:</div>
                <div className="now-challenge">Now</div>
                <div className="challenge-label">Distance:</div>
                <select id="distance-metric">
                    <option value="miles">Miles</option>
                    <option value="kilometers">Kilometers</option>
                    <option value="feet">Feet</option>
                </select>                
                <div className="challenge-label">Message:</div>
                <input value="" placeholder="Your Message" className="challenge-message"></input>               
                <button id="submitButton">Send Challenge</button>
            </div>
        ):
        <h2>Loading...</h2>
        }
        </div>
    )
}
const useSearchValue = (initialValue) =>{
    const [userState, setUserState] = useState(initialValue);
    const handlevaluechange =(e) =>{
        setUserState(e.target.value);
        console.log(e.target.value)
    }
    return {
        value: userState,
        onChange: handlevaluechange,
       
    }
}
export default ChallengeForm