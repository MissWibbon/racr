import React, { useState, useEffect, useRef, useContext } from 'react';
import * as filestack from 'filestack-js';
import { Link } from 'react-router-dom';
import API from '../utils/API';
import { RaceContext } from './appstate';
import { countryDATA } from '../data/countries';

const EditProfile = ({ props, match }) => {

	const flistack_init = process.env.FILESTACK_INIT;

	const client = filestack.init('AOSlwG5A8SmC6QervCN3zz');

	const context = useContext(RaceContext);
	const { localUser, setusers, setLoading } = context;
	const id = localUser._id
	const containerRef = useRef();
	const { current } = containerRef;
	const [password, setPassword] = useState(localUser.password);
	const [firstName, setFirstName] = useState(localUser.firstName);
	const [lastName, setLastName] = useState(localUser.lastName);
	const [image, setImage] = useState(localUser.image);
	const [country, setCountry] = useState(localUser.country)
	const [countryCode, setCountryCode] =useState(localUser.countryCode)
	const [state, setStateName] = useState(localUser.state)
	const [statesExist, showStates] = useState(true)
	const [statesArray, setStatesArray] = useState([]);
	const profileStates = countryDATA.filter(function (state) {
		return state.name === localUser.country
	})
	let states;
	states = profileStates[0].states
	//statesArray.push([states])
	let statesPool;
	statesPool = states.map(state => {
		return state
	})
	console.log(country)
	//const context = useContext(RaceContext);

	//setStatesArray(statesArray.concat(states))
	let statesOptions
	statesOptions = states.map(state =>
		<option key={state.code} value={state.name}>{state.name} </option>
	)

	const handleLoad = () => {
		setStatesArray(statesOptions)
	}

	const fetchUsers = (query) => {
        API.getUsers(query)
            .then(res => {
                setusers(res.data)
                setLoading(true)
            })
    }
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
	const handleSubmit = (e) => {
		e.preventDefault();
		if(!firstName.value === "") {
			setFirstName(firstName.value)
		}
		if(!lastName.value === "") {
			setLastName(lastName.value)
		}
		const body = {
			_id: localUser._id,
			email: localUser.email,
			password: localUser.password,
			firstName: firstName,
			lastName: lastName,
			userName: localUser.userName,
			state: state,
			country: country,
			countryCode: countryCode,
			dob: localUser.dob,
			image: image,
			friends: localUser.friends,
			notifications: localUser.notifications,
			racing: localUser.racing,
			races: localUser.races,
			onlineStatus: localUser.onlineStatus
		};
		console.log(localUser)
		console.log(body)
		API.editUser(body).then((res) => {
			console.log(res)
			console.log(JSON.parse(res.config.data))
			localUser.userName = firstName;
			localUser.lastName = lastName;
			localUser.state = state;
			localUser.country = country;
			localUser.countryCode = countryCode;
			localUser.image = image;
			//setLocalUser(JSON.parse(res.config.data))
			//props.history.push('/home');
			document.querySelector('a[href="/home"]').click()
		});
		API.getUsers()
	};
	const handleImageSelect = (event) => {
		client.picker(options).open()

	}

	const deleteProfile = (e) => {
		console.log(e)
	}
	const hasStates = (e) => {
		console.log(statesOptions)
		statesArray.splice(0, statesArray.length)
		console.log(statesOptions)
		const selectedCountry = e.target.value
		let selectedCountryStates
		setCountry(selectedCountry)
		countryDATA.map(country => {
			if (country.name === selectedCountry) {
				setCountryCode(country.code)
				console.log(country)
				selectedCountryStates = country.states
			}
		}
		)
		let newState = countryDATA.filter(function (state) {
			return state.name === selectedCountry

		})
		console.log(newState)
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
		else { showStates(false); console.log('is ' + null); setStateName("") }

	}
	const handleStateUpdate = (e) => {
		const selectedState = e.target.value
		setStateName(selectedState)
	}
	useEffect(handleLoad, [current], statesArray, states);

	return (
		<div className="registerWrap" ref={containerRef}>

			<form id="register">
				<div className="inputWrap">
					<label id="firstName">First Name:</label>
					<input id="firstNameInput" {...firstName} type="text" name="name" placeholder={localUser.firstName} />
				</div>
				<div className="inputWrap">
					<label id="lastName">Last Name:</label>
					<input id="lastNameInput" {...lastName} type="text" name="name" placeholder={localUser.lastName}/>
				</div>
				<div className="inputWrap">
					<label id="country">Country:</label>
					<select id="selectBox" {...country} onChange={hasStates} value={country}>
						{countryDATA.map(country =>
							<option key={country.code} value={country.name}>{country.name} </option>
						)}
					</select>
				</div>
				{statesExist ?
					<div className="inputWrap">
						<label id="state">State:</label>
						<select id="selectBox" {...state} value={state} onChange={handleStateUpdate}>
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
				<button id="delete-profile" onClick={deleteProfile}>
									Delete Profile <i className="fas fa-trash-alt"></i>
								</button>
				<button id="submitButton" onClick={handleSubmit} type="submit">
					Update Profile
				</button>
				<Link id="cancel" to='/home'>
					Cancel
				</Link>
			</form>
			<div className="successMsg" />
		</div>
	);
}

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

export default EditProfile;