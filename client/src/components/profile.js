import React, { useState, useCallback } from 'react'
import * as filestack from 'filestack-js';
import { Link } from 'react-router-dom';
import API from '../utils/API';
const flistack_init = process.env.FILESTACK_INIT;

const client = filestack.init('FILESTACK_INIT');



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
    let mailregx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [errorMsg, setErrorMsg] = useState(false)



    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            email: email.value.toLowerCase(),
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
        setErrorMsg(prev => mailregx.test(body.email))
        console.log(body.email + ' : ' + email)
        if (mailregx.test(body.email)) {
            // this is a valid email address
            // call setState({email: email}) to update the email
            // or update the data in redux store.
            API.saveUser(body)
                .then(res => {
                    props.history.push('/login')

                })
        }
        else {
            console.log('not valid email, emailError: ')
        }



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
                    <div className="warningMsg email">
                        {
                            errorMsg ? <div>Please enter a valid email address.</div> : null
                        }
                    </div>
                    <label id="email">Email:</label>
                    <input {...email} type='text' name='name' required></input>
                </div>
                <div className="inputWrap">
                    <label id="userName">User Name:</label>
                    <input {...userName} type='text' name='name' required></input>
                </div>
                <div className="inputWrap">
                    <label id="password">Password:</label>
                    <input {...password} type='text' name='name' required></input>
                </div>
                <div className="inputWrap">
                    <label id="age">Date of Birth:</label>
                    <input {...age} type='date' name='name'></input>
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
            <div className="successMsg">

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

export default SignUp