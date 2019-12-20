import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import API from '../utils/API'
import { RaceContext } from './appstate'
import io from 'socket.io-client';
// const socket = io('https://mernracr.herokuapp.com');
import { socket } from '../socket'


const Landing = (props) => {
    const context = useContext(RaceContext)
    const [errMessage, setErr] = useState('')
    const email = useInput('');
    const password = useInput('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            email: email.value.toLowerCase(),
            password: password.value
        }
        API.login(body)
            .then(res => {
                if(!res.message){
                    window.localStorage.setItem('token', JSON.stringify(res.data))
                    const pass = context.getToken()
                    if (pass) {
                        props.history.push('/home')
                    } else {
                        setErr('Invalid Username or Password')
                    }

                }else{
                    setErr(res.message)
                }
            })

    }
    return (
        <div>
            <div className="loginWrap">
                <div className="logo"></div>
                <form id="login">
                    <label id="email">Email:</label>
                    <input {...email} type='text' name='name'></input>
                    <p className= 'err'>{errMessage}</p>
                    <label id="password">Password:</label>
                    <input {...password} type='password' name='name'></input>
                    <div><button id="submitButton" onClick={handleSubmit} type='submit'>Submit</button></div>
                    <div className="registerLink"><Link to="/signup">Register</Link></div>
                </form>
            </div>
        </div>
    )
}

const useInput = (initialvalue) => {
    const [inputs, setInputs] = useState(initialvalue);
    const handlevaluechange = (e) => {
        setInputs(e.target.value)

    }
    return {
        value: inputs,
        onChange: handlevaluechange
    }

}
export default Landing