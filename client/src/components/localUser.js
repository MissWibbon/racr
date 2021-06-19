import React, { useContext, useState } from 'react'
import { RaceContext } from './appstate'
import SearchBar from './searchbar';

const LocalUser = (props) => {
    const context = useContext(RaceContext)
    const { users, localUser, friends } = context
    const { isLoading } = context
    const searchbar = useSearchValue('')
    console.log(users)
    
    const [pool , setPool] = useState([])

    const friendList = localUser.friends
    const friends = users.filter(user => user._id === friendList).map(user => 
        <li>{user}</li>
    )
    console.log(friends)
    console.log(friendList)



    
    return (
        <div id="profilePage">
            <SearchBar {...props}></SearchBar>
            {isLoading
                ? (
                    <div>
                        <div className="profileImage">
                            <img className="imgSrc" src={`${localUser.image} `} alt="profile-img" />
                            <div className="locationWrap">
                                <div className="profileLocation">{`${localUser.city}, ${localUser.state} ${localUser.country}`}</div>
                            </div>
                        </div>
                        <div className="profileInfo">
                            <div className="profileUserName">{`${localUser.userName}`}</div>
                            <div className="profileName">{`${localUser.firstName} ${localUser.lastName}`}</div>
                            {/* <div className="profileRunType">{`${users[3].raceType.charAt(0).toUpperCase()}` + `${users[3].raceType.slice(1)}`} Runner</div> */}
                        </div>
                        <div className="profileActivity">
                            <div className="profileFriends">
                                <div className="profileInfo-label">Friends</div>
                                <ul id="friends">
                                    {friends.true}
                                </ul>
                            </div>
                            <div className="profileRaces">
                                <div className="profileInfo-label">Races</div>
                            </div>
                        </div>
                    </div>
                ) :
                <h2>Loading...</h2>
            }
        </div>
    )
}

const useSearchValue = (initialValue) => {
    const [userState, setUserState] = useState(initialValue);
    const handlevaluechange = (e) => {
        setUserState(e.target.value);
        console.log(e.target.value)
    }
    return {
        value: userState,
        onChange: handlevaluechange,

    }
}

export default LocalUser