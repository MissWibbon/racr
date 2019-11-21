import React, { useState } from 'react'
import * as filestack from 'filestack-js';
import { Link } from 'react-router-dom';
import API from '../utils/API';

const client = filestack.init('AFeiQyudCRNK8T2g46sKFz');

const SignUp = (props) => {
    //const context = useContext(RaceContext); 
    const email = useInput('');
    const password = useInput('');
    const firstName = useInput('');
    const lastName = useInput('');
    const userName = useInput('');
    const city = useInput('');
    const state = useInput('');
    const country = useInput('');
    const age = useInput('');
    let image = '';

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            email: email.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value,
            userName: userName.value,
            city: city.value,
            state: state.value,
            country: country.value,
            age: age.value,
            image
        }
        console.log(body)
        API.saveUser(body)
            .then(res => {
                props.history.push('/login')

            })



    }

    const fileChange = (event) => {
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
    return (
        <div className="registerWrap">
            <form id="register">
                <div className="inputWrap">
                    <label id="email">Email:</label>
                    <input {...email} type='text' name='name'></input>
                </div>
                <div className="inputWrap">
                    <label id="userName">User Name:</label>
                    <input {...userName} type='text' name='name'></input>
                </div>
                <div className="inputWrap">
                    <label id="password">Password:</label>
                    <input {...password} type='password' name='name'></input>
                </div>
                <div className="inputWrap">
                    <label id="age">Age:</label>
                    <input {...age} type='text' name='name'></input>
                </div>
                <div className="inputWrap">
                    <label id="firstName">First Name:</label>
                    <input id="firstNameInput" {...firstName} type='text' name='name'></input>
                </div>
                <div className="inputWrap">
                    <label id="lastName">Last Name:</label>
                    <input id="lastNameInput" {...lastName} type='text' name='name'></input>
                </div>
                <div className="inputWrap">
                    <label id="city">City:</label>
                    <input {...city} type='text' name='name'></input>
                </div>
                <div className="inputWrap">
                    <label id="state">State:</label>
                    <input {...state} type='text' name='name'></input>
                </div>
                <div className="inputWrap">
                    <label id="country">Country:</label>
                    <input {...country} type='text' name='name'></input>
                </div>
                <div className="inputWrap">
                    <label id="profileImage">Image:</label>
                    <input id="imageUpload" type="file" onChange={fileChange} name='name'></input>
                </div>
                <button id="submitButton" onClick={handleSubmit} type='submit'>Submit</button>
                <div class="signinLink"><Link to="/">Sign In</Link></div>
            </form>

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

export default SignUp