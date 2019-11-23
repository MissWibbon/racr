import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import API from '../utils/API'
import { RaceContext } from './appstate'
import io from 'socket.io-client';
const socket = io('https://mernracr.herokuapp.com');


const Landing = (props) => {
    const context = useContext(RaceContext)
    const email = useInput('');
    const password = useInput('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            email: email.value,
            password: password.value
        }
        API.login(body)
            .then(res => {
                window.localStorage.setItem('token', JSON.stringify(res.data))
                const pass = context.getToken()
                if (pass) {
                    props.history.push('/home')
                } else {
                    console.log('not auth')
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