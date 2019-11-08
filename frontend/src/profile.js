import React, {useState} from 'react'
import * as filestack from 'filestack-js';
import {Link} from 'react-router-dom'
import API from './utils/API'


const client = filestack.init('apikey');

const SignUp = () =>{

    const email = useInput('');
    const password = useInput('');
    const firstName = useInput('');
    const lastName = useInput('');
    const userName = useInput('');
    const city = useInput('');
    const state = useInput('');
    const country = useInput('');
    const age = useInput('');
    let image ='';

    const handleSubmit = (e) =>{
        e.preventDefault();
        const body ={
            email,
            password,
            firstName,
        lastName,
        userName,
    city,
    state,
    country,
    age,
    image
    }


        console.log('this is where i send shit');
        
    }
    
    const fileChange = (event) =>{
        const files = event.target.files;
        const file = files.item(0);
      
        client.upload(file)
          .then(res => {
            console.log('success: ', res)
            image = res.url
          })
          .catch(err => {
            console.log(err)
          });
          return image
    }
    return(
        <div className="registerWrap">
            <form id="register">
                <label id="email">Email:</label>
                <input {...email} type ='text' name = 'name'></input>
                <label id="password">Password:</label>
                <input {...password} type ='password' name = 'name'></input>
                <label id="firstName">First Name:</label>
                <input {...firstName} type ='text' name = 'name'></input>
                <label id="lastName">Last Name:</label>
                <input {...lastName} type ='text' name = 'name'></input>
                <label id="userName">User Name:</label>
                <input {...userName} type ='text' name = 'name'></input>
                <label id="city">City:</label>
                <input {...city} type ='text' name = 'name'></input>
                <label id="state">State:</label>
                <input {...state} type ='text' name = 'name'></input>
                <label id="country">Country:</label>
                <input {...country} type ='text' name = 'name'></input>
                <label id="age">Age:</label>
                <input {...age} type ='text' name = 'name'></input>
                <label id="profileImage">Image:</label>
                <input type = "file" onChange = {fileChange}name = 'name'></input>
                <button id="submitButton" onClick ={handleSubmit} type ='submit'>Submit</button>
                <div class="signinLink"><Link to="/">Sign In</Link></div>
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

export default SignUp