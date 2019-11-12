import React, {useState, useContext}  from 'react'
import {Link} from 'react-router-dom'
import API from '../utils/API'
import {RaceContext} from './appstate'
const Landing =() =>{
    const context = useContext(RaceContext)
    const email = useInput('');
    const password = useInput('');
    const handleSubmit = (e) =>{
        const body = {
            email: email.value,
            password: password.value
        }
        e.preventDefault();
        API.login(body)
            .then(res => {
                window.localStorage.setItem('token', JSON.stringify(res.data))
                context.getToken()
                if (context.isAuth){
                    console.log('auth')
                }else{
                    console.log('not auth')
                }
            })
        console.log('this is where i send shit');
        
    }
    return(
        <div className="loginWrap">
            <form id="login">
                <label id="email">Email:</label>
                <input {...email}type ='text' name = 'name'></input>
                <label id="password">Password:</label>
                <input {...password}type ='password' name = 'name'></input>
                <div><button id="submitButton" onClick ={handleSubmit} type ='submit'>Submit</button></div>
                <div class="registerLink"><Link to="/signup">Register</Link></div>
            </form>
        </div>
    )
}

const useInput = (initialvalue) => {
    const [inputs, setInputs] = useState(initialvalue);
    const handlevaluechange =(e) =>{
        setInputs(e.target.value)
        console.log(e.target.value)

    }
    return {
        value:inputs,
        onChange: handlevaluechange
    }

  }
export default Landing