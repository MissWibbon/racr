import React, { useContext, useState, useEffect, button } from 'react';
import { RaceContext } from './appstate';
import SearchBar from './searchbar';
import API from '../utils/API'
import { Link, Redirect } from 'react-router-dom';
import { countryDATA } from '../data/countries';

const LocalUser = ({ props, match }) => {
	const context = useContext(RaceContext);
	const { localUser, setOnline, isOnline, profile, isLoading, setLoading, removeFriend, isAuth, race } = context;
	setOnline(true);
	const [friendList, setFriendsList] = useState(localUser.friends);

	//const [friendCount, setFriendCount] = useState(0)
	localUser.onlineStatus = true;
	//const friends = users.filter((user) => user._id === friendList).map((user) => <li>{user}</li>);
	const jwt = window.localStorage.getItem('token');
	const friendCount = friendList.length

	const handleOnLoad = () => {
		console.log(friendList.length)
		countryDATA.map((country) => {
			if (localUser.country === country.name && localUser.countryCode !== country.code) {
				localUser.countryCode = country.code
				API.editUser(localUser)
			}
		})
		console.log(localUser)
	}

	const handleRemoveFriend = () => {
		let friendJson = JSON.parse(jwt)
		console.log(friendJson)

	}

	useEffect(handleOnLoad)

	return (
		<div id="profilePage">
			{race
				?
				(
					<Redirect to='/racetest' />
				)
				: (
					<>
						<SearchBar {...props} />
						{isLoading ? (
							<div className="profileContent">
								<div className="profileHead">
									<div className="profile-left-col">
										<div className="profileImage" style={{ backgroundImage: "url(" + localUser.image + ")" }}>
										</div>
										<div className="locationWrap">
											<div className="profileLocation"><i className="fas fa-map-marker-alt"></i><p className="user-state">{`${localUser.state}`}</p>
												<div className="flag-icon"><img src={`https://hatscripts.github.io/circle-flags/flags/${localUser.countryCode.toLowerCase()}.svg`} width="12" alt={localUser.country} /></div>
											</div>
										</div>
									</div>
									<div className="profileInfo">
										<div className="profileUserName">{`${localUser.userName}`}</div>
										<div className="profileName">{`${localUser.firstName} ${localUser.lastName}`}</div>
										{isOnline ? <div className="onlinestatus">Is online!</div> : null}
										<Link to={`/edit-profile`}>

											<i id="edit-profile" className="fas fa-edit"></i>
										</Link>

									</div>
								</div>
								<div className="profileActivity">
									<div className="profileFriends">
										<div className="profileInfo-label">
											<span className="friendcount">
												{friendList !== undefined && "(" + friendCount + ")"}
											</span> Friends
										</div>
										<ul id="friends">
											{localUser.friends.map((friend) => {
												return (
													<li className="friend-li">
														<Link to={`/users/${friend._id}/`}>
															<div className="friends-user-img">
																<div className="usersImgSrc" style={{ backgroundImage: "url(" + friend.image + ")" }}></div>
																<img src={`https://hatscripts.github.io/circle-flags/flags/${friend.countryCode.toLowerCase()}.svg`} width="10" className="flag-icon" alt={friend.country} />
															</div>
															<div className="friendUserName">{friend.userName}</div>
														</Link>
														<button user-id={friend._id} onClick={() => {
															removeFriend({
																id: friend._id,
																userName: friend.userName,
																country: friend.country,
																countryCode: friend.countryCode,
																state: friend.state,
																image: friend.image,
																friendId: localUser._id

															}); handleRemoveFriend();
														}} className="remove-friend-btn"><i class="fas fa-user-minus"></i></button>
													</li>
												)
											})}
										</ul>
									</div>
									<div className="profileRaces">
										<div className="profileInfo-label">Races</div>
									</div>
								</div>
							</div>
						) : (
							<h2>Loading...</h2>
						)}
					</>
				)
			}
		</div>
	);
};

const useSearchValue = (initialValue) => {
	const [userState, setUserState] = useState(initialValue);
	const handlevaluechange = (e) => {
		setUserState(e.target.value);
		console.log(e.target.value);
	};
	return {
		value: userState,
		onChange: handlevaluechange
	};
};


export default LocalUser;
