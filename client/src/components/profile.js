import React, { useState, useEffect, useRef } from 'react';
import * as filestack from 'filestack-js';
import { Link } from 'react-router-dom';
import API from '../utils/API';
import { countryDATA } from '../data/countries';
const FILESTACK_URI = process.env.FILESTACK_INIT;

const client = filestack.init('AOSlwG5A8SmC6QervCN3zz');

const SignUp = (props) => {
	//const context = useContext(RaceContext);
	const containerRef = useRef();
	const { current } = containerRef;
	const email = useInput('');
	const password = useInput('');
	const firstName = useInput('');
	const lastName = useInput('');
	const userName = useInput('');
	const dob = useInput('');
	const [image, setImage] = useState('https://cdn.filestackcontent.com/yI37SO0Rr2U3AUL7Syvo')
	let mailregx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const [initCountry, setCountry] = useState("United States")
	const [countryCode, setCountryCode] = useState("US")
	const [initState, setStateName] = useState("Alaska")
	const state = useInput('');
	const country = useInput('');
	const [statesExist, showStates] = useState(true)
	const [errorMsg, setErrorMsg] = useState(false);
	const [passErrorMsg, setPassErrorMsg] = useState(false);
	const [usernameErrorMsg, setUsernameErrorMsg] = useState(false);
	const [statesArray, setStatesArray] = useState([]);
	const usStates = countryDATA.filter(function (state) {
		return state.name === "United States"
	})
	let states = usStates[0].states

	//setStatesArray(statesArray.concat(states))
	let statesOptions = states.map(state =>
		<option key={state.code} value={state.name}>{state.name} </option>
	)
	const options = {
		accept: ["image/*"],
		fromSources: ["local_file_system", "instagram", "facebook"],
		onFileSelected: file => {
			// If you throw any error in this function it will reject the file selection.
			// The error message will be displayed to the user as an alert.
			if (file.size > 1000 * 1000) {
				throw new Error('File too big, select something smaller than 1MB');
			}
			console.log(file)

		},
		onFileUploadFinished: file => {
			console.log(file)
			setImage(file.url)
		},
	};
	const validEmail = (e) => {
		e.preventDefault();
		const email = e.target.value;
		if (!mailregx.test(email)) {
			setErrorMsg((prev) => mailregx.test(email));
		}
	};
	const handleLoad = () => {
		setStatesArray(statesOptions)
	}
	const handleImageSelect = (event) => {
		client.picker(options).open()

	}

	const handleSubmit = (e) => {
		e.preventDefault();
		let createdDate = new Date
		countryDATA.map((country) => {
			if (initCountry === country.name) {
				setCountryCode(country.code)
			}
		})

		const body = {
			email: email.value.toLowerCase(),
			password: password.value,
			firstName: firstName.value,
			lastName: lastName.value,
			userName: userName.value,
			state: initState,
			country: initCountry,
			countryCode: countryCode,
			dob: dob.value,
			image: image,
			accountCreated: createdDate,
			lastLogin: ""
		};

		console.log(body);

		if (body.password.length < 6) {
			setPassErrorMsg(true);
		} else {
			setPassErrorMsg(false);
		}
		if (!mailregx.test(body.email)) {
			setErrorMsg(true);
		} else {
			setErrorMsg(false);
		}
		if (body.userName.length < 1) {
			setUsernameErrorMsg(true);
		} else {
			setUsernameErrorMsg(false);
		}
		if (mailregx.test(body.email) && !passErrorMsg && !usernameErrorMsg) {
			// this is a valid email address
			// call setState({email: email}) to update the email
			// or update the data in redux store.
			API.saveUser(body).then((res) => {
				props.history.push('/login');
			});
		} else {
			console.log(errorMsg);
			console.log('not valid email, emailError: ');
		}
	};

	const hasStates = (e) => {
		statesArray.splice(0, statesArray.length)
		const selectedCountry = e.target.value
		let selectedCountryStates
		setCountry(selectedCountry)
		countryDATA.map(country => {
			if (country.name === selectedCountry) {
				setCountryCode(country.code)
				selectedCountryStates = country.states
			}
		}
		)
		let newState = countryDATA.filter(function (state) {
			return state.name === selectedCountry

		})
		if (selectedCountryStates !== null) {
			setStateName(newState[0].states[0].name)
			states = newState[0].states
			let updatedStatesOptions = states.map(state =>
				<option key={state.code} value={state.name}>{state.name} </option>
			)
			console.log(states)
			showStates(true)
			//setStateName(statesArray.name)
			setStatesArray(updatedStatesOptions)
		}
		else { showStates(false); console.log('is ' + null); setStateName('') }

	}
	const handleStateUpdate = (e) => {
		const selectedState = e.target.value
		setStateName(selectedState)
	}

	useEffect(handleLoad, [current], statesArray, initState, states);

	return (
		<div className="registerWrap" ref={containerRef}>

			<form id="register">
				<div className="inputWrap">
					<div className="warningMsg email">
						{errorMsg ? <div className="warningLabel">Please enter a valid email address.</div> : null}
					</div>
					<label id="email">Email:</label>
					<input {...email} type="text" name="name" required />
				</div>
				<div className="inputWrap">
					<div className="warningMsg email">
						{usernameErrorMsg ? <div className="warningLabel">User name is required.</div> : null}
					</div>
					<label id="userName">User Name:</label>
					<input {...userName} type="text" name="name" required />
				</div>
				<div className="inputWrap">
					<div className="warningMsg password">
						{passErrorMsg ? (
							<div className="warningLabel">Password must be atleast 6 characters long.</div>
						) : null}
					</div>
					<label id="password">Password:</label>
					<input {...password} type="text" name="name" required />
				</div>
				<div className="inputWrap">
					<label id="age">Date of Birth:</label>
					<input {...dob} type="date" name="name" />
				</div>
				<div className="inputWrap">
					<label id="firstName">First Name:</label>
					<input id="firstNameInput" {...firstName} type="text" name="name" />
				</div>
				<div className="inputWrap">
					<label id="lastName">Last Name:</label>
					<input id="lastNameInput" {...lastName} type="text" name="name" />
				</div>
				<div className="inputWrap">
					<label id="country">Country:</label>
					<select id="selectBox" {...country} onChange={hasStates} value={initCountry}>
						{countryDATA.map(country =>
							<option key={country.code} value={country.name}>{country.name} </option>
						)}
					</select>
				</div>
				{statesExist ?
					<div className="inputWrap">
						<label id="state">State:</label>
						<select id="selectBox" {...state} value={initState} onChange={handleStateUpdate}>
							{[statesArray]}
						</select>
					</div>
					: ''}
				<div className="inputWrap">
					<div className="image-label-wrap">
						<div>
							<label id="profileImage">Image:</label>
							<i id="imageUpload" type="file" onClick={handleImageSelect} className="fas fa-camera"></i>
						</div>
						<div className="profileuserImgSrc" style={{ backgroundImage: "url(" + image + ")" }}></div>
					</div>
				</div>
				<button id="submitButton" onClick={handleSubmit} type="submit">
					Submit
				</button>
				<div className="signinLink">
					<Link to="/login">Sign In</Link>
				</div>
			</form>
			<div className="successMsg" />
		</div>
	);
};

const useInput = (initialvalue) => {
	const [inputs, setInputs] = useState(initialvalue);
	const handlevaluechange = (e) => {
		setInputs(e.target.value);
	};
	return {
		value: inputs,
		onChange: handlevaluechange
	};
};

export default SignUp;
