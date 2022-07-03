
import React, { useContext, useEffect, useState } from 'react'
import { RaceContext } from './appstate'
import { Link, Redirect } from 'react-router-dom'
import SearchBar from './searchbar';
import { socket } from '../socket'

const User = ({ match, props }) => {
    console.log(match)
    const context = useContext(RaceContext);
    const { id } = match.params
    const { isLoading, profile, fetchOneUser, addFriend, localUser, users, setStats, isAuth, race } = context
    const friendSearch = []
    useEffect(() => {
        context.fetchOneUser(id)
    }, [])
    const [friendList, setFriendsList] = useState(profile.friends);
    localUser.friends.map((f) => {
        friendSearch.push(f._id)
    })
    const isFriends = friendSearch.includes(id);
    const [initID, setID] = useState(id)
    const [friendAdded, showFriendAdded] = useState(false)
    const profileFlag = `https://hatscripts.github.io/circle-flags/flags/` + profile.countryCode + `.svg`
    const flagURL = profileFlag.toLowerCase()

    const jwt = window.localStorage.getItem('token');


    const handleLoad = () => {
        console.log(friendList)
        console.log(profile)
        console.log(flagURL)
        setFriendsList(profile.friends)
    }
    const handleShowAddFriend = () => {
        localUser.friends.push({ _id: profile._id, userName: profile.userName, image: profile.image, country: profile.country, countryCode: profile.countryCode, state: profile.state })
        friendList.push({ _id: localUser._id, userName: localUser.userName, image: localUser.image, country: localUser.country, countryCode: localUser.countryCode, state: localUser.state })
        showFriendAdded(true)
        const body = {
            friendRequestorID: localUser._id,
            friendRequestorName: localUser.userName,
            friendRequestorImg: localUser.image,
            friendAcceptorID: profile._id,
            friendAcceptorName: profile.userName,
            timestamp: Date.now()
        }
        socket.emit('friendrequest', body)
        let friendJson = JSON.parse(jwt)
        friendJson.friends.push({ _id: localUser._id, userName: localUser.userName, image: localUser.image, country: localUser.country, countryCode: localUser.countryCode, state: localUser.state })


    }

    useEffect(() => {
        context.fetchOneUser(initID);
    }, [])
    useEffect(handleLoad);


    if (!isAuth) {
        return (
            <div id="not-authed">
                <p>Please <Link to="/login">Login</Link></p>
            </div>
        )
    } else {
        return (

            <div id="profilePage">
                {race
                    ?
                    (
                        <Redirect to='/racetest' />
                    )
                    : (
                        <>
                            <SearchBar></SearchBar>
                            {isLoading
                                ? (
                                    <>
                                        <div className="profileHead">
                                            <div className="profile-left-col">
                                                <div className="profileImage" style={{ backgroundImage: "url(" + profile.image + ")" }}>
                                                </div>
                                                <div className="locationWrap">
                                                    <div className="profileLocation"><i className="fas fa-map-marker-alt"></i><p className="user-state">{`${profile.state}`}</p>
                                                        <div className="flag-icon"><img src={flagURL} width="12" alt={profile.country} /></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="profileInfo">
                                                {friendAdded ?
                                                    <p className="friendadded-label">Friend added!</p>
                                                    : ''}
                                                <div className="profileUserName">{`${profile.userName}`}</div>
                                                <div className="profileName">{`${profile.firstName} ${profile.lastName}`}</div>
                                                <Link to={`/users/${id}/challengeform`}><button id="challenge-friend-btn"></button></Link>
                                                {isFriends || profile._id === localUser._id
                                                    ? ''
                                                    : (
                                                        <button onClick={() => {
                                                            addFriend({
                                                                id: id,
                                                                friendId: localUser._id,
                                                                friendName: localUser.userName,
                                                                profileName: profile.userName,
                                                                friendCountry: localUser.country,
                                                                profileCountry: profile.country,
                                                                friendCountryCode: localUser.countryCode,
                                                                profileCountryCode: profile.countryCode,
                                                                friendState: localUser.state,
                                                                profileState: profile.state,
                                                                friendImage: localUser.image,
                                                                profileImage: profile.image

                                                            }); handleShowAddFriend();
                                                        }} id="add-friend-btn"><i class="fas fa-user-plus"></i></button>
                                                    )}
                                            </div>
                                        </div>
                                        <div className="profileActivity">
                                            <div className="profileFriends">
                                                <div className="profileInfo-label">
                                                    <div className="profileInfo-label">
                                                        (<span className="friendcount">
                                                            {friendList !== undefined && profile.friends.length}
                                                        </span>) Friends
                                                    </div>
                                                </div>
                                                <ul id="friends">
                                                    {friendList !== undefined && profile.friends.map((friend) => {
                                                        return (
                                                            <li className="friend-li" friend-id={friend._id} onClick={() => { setID(friend._id); fetchOneUser(friend._id) }}>
                                                                {friend._id !== localUser._id ?
                                                                    <Link to={`/users/${friend._id}`} key={friend._id}>
                                                                        <div className="friends-user-img">
                                                                            <div className="usersImgSrc" style={{ backgroundImage: "url(" + friend.image + ")" }}></div>
                                                                            <img src={`https://hatscripts.github.io/circle-flags/flags/${friend.countryCode.toLowerCase()}.svg`} width="10" className="flag-icon" alt={friend.country} />
                                                                        </div>
                                                                        <div className="friendUserName">{friend.userName}</div>
                                                                    </Link>
                                                                    :
                                                                    <Link to={`/home`} key={friend._id}>
                                                                        <div className="friends-user-img">
                                                                            <div className="usersImgSrc" style={{ backgroundImage: "url(" + friend.image + ")" }}></div>
                                                                            <img src={`https://hatscripts.github.io/circle-flags/flags/${friend.countryCode.toLowerCase()}.svg`} width="10" className="flag-icon" alt={friend.country} />
                                                                        </div>
                                                                        <div className="friendUserName">{friend.userName} <span className="you">- you</span></div>
                                                                    </Link>
                                                                }
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                            <div className="profileRaces">
                                                <div className="profileInfo-label">Races</div>
                                            </div>
                                        </div>
                                    </>
                                ) :
                                <h2>Loading...</h2>
                            }
                        </>
                    )}
            </div>
        )
    }
}
const useSearchValue = (initialValue) => {
    const [userState, setUserState] = useState(initialValue);
    const handlevaluechange = (e) => {
        setUserState(e.target.value);
    }
    return {
        value: userState,
        onChange: handlevaluechange,

    }
}
export default User