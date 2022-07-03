import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import API from '../utils/API'
import { RaceContext } from './appstate'
const uri = process.env.MONGODB_URI;


const Landing = (props) => {
    const context = useContext(RaceContext)
    const { users, isAuth } = context
    const [errMessage, setErr] = useState(false)
    const email = useInput('');
    const password = useInput('');
    const [passValue, setPassValue] = useState('')
    const [authPassValue, setAuthPathValue] = useState('')
    const [userAuth, setUserAuth] = useState(undefined)
    const [unknownEmail, setUnknownEmail] = useState(false)

    const handleEmailExists = (e) => {
        e.preventDefault();
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setPassValue(password.value)
        const body = {
            email: email.value.toLowerCase(),
            password: password.value,

        }
        let auth = null
        auth = users.filter((function (user) {
            return user.email == body.email
        }))
        console.log(auth)
        if(auth.length > 0) {
            console.log(auth[0].password)
            console.log(auth)

            API.login(body)
                .then(res => {
                    console.log(res.data)
                    window.localStorage.setItem('token', JSON.stringify(res.data))
                    const pass = context.getToken()
                    console.log(pass)
                    const rightPass = password.value
                    if (!res.message) {
                        console.log(email.value)
                        //API.getOneUser(user)
                        setUserAuth(users.filter((user) => {
                            return user.email === email.value
                        }))
                        console.log(userAuth)
                        setUnknownEmail(false)
                        props.history.push('/home')

                    }else {
                        setErr(true)
                        props.history.push('/login')
                    }
                })
        }
        else {
            setUnknownEmail(true)
        }

    }

    return (
        <div>
            <div className="loginWrap">
                <div className="logo"></div>
                {isAuth ? (
                    <>
                        <p>You're already logged in</p>
                        <Link to="/home">Go home</Link>
                    </>
                )
                    : (
                        <form id="login" onChange={handleEmailExists}>
                            <label id="email">Email:</label>
                            <input {...email} type='text' name='name' ></input>
                            <label id="password">Password:</label>
                            <input {...password} type='password' name='name'></input>
                            {errMessage ?
                                <div className="incorrectAuthLabel">Incorrect password.</div>
                                : ''}
                            {unknownEmail ?
                                <div className="incorrectAuthLabel">Couldn't find email associated to account.</div>
                                : ''}
                            <div><button id="submitButton" onClick={handleSubmit} type='submit'>Submit</button></div>
                            <div className="registerLink"><Link to="/signup">Register</Link></div>
                        </form>
                    )}
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