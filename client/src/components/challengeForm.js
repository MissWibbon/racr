import React, {useContext, useEffect, useState}from 'react'
import {RaceContext} from './appstate'
import io from 'socket.io-client';
 
const socket = io('http://localhost');
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
  socket.on('disconnect', function(){});

const ChallengeForm = ({match}) =>{
    
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
            <div className="challenge-form">
                <div className="challenge-label">Distance:</div>
                <input type = 'text' {...number} placeholder ='number' ></input>
                <p>{number.value}</p>
                <select id="distance-metric" {...metric}>
                    <option value="miles">Miles</option>
                    <option value="kilometers">Kilometers</option>
                    <option value="feet">Feet</option>
                </select>                
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

const useInput = (initialValue) =>{

    const  [value , setValue] = useState(initialValue)
    
    const  handlevaluechange = (e) => {
        setValue(e.target.value)
        console.log(e.target.value)
    }

    return {
        value,
        onChange: handlevaluechange
    }
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