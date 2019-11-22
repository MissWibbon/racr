import React, {useContext, useState}from 'react'
import {RaceContext} from './appstate'
import SearchBar from './searchbar';

const LocalUser = (props) =>{
    const context = useContext(RaceContext)
    const {users,localUser} = context
    const {isLoading} = context
    const searchbar = useSearchValue('')
    return(
        <div id="profilePage">
<<<<<<< HEAD
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
                            <div className="profileUserName">@{`${localUser.userName}`}</div>
                            <div className="profileName">{`${localUser.firstName} ${localUser.lastName}`}</div>
                            {/* <div className="profileRunType">{`${users[3].raceType.charAt(0).toUpperCase()}` + `${users[3].raceType.slice(1)}`} Runner</div> */}
                        </div>
                    </div>
                ) :
                <h2>Loading...</h2>
            }
        </div>
=======
        <SearchBar {...props}></SearchBar>
        {isLoading
        ?(
            <div>
                <div className="profileImage">
                    <img className="imgSrc" src={`${localUser.image} `} alt="profile-img"/>
                    <div className="locationWrap">
                        <div className="profileLocation">{`${localUser.city}, ${localUser.state} ${localUser.country}` }</div>
                    </div>
                </div>
                <div className="profileInfo">
                    <div className="profileUserName">@{`${localUser.userName}` }</div>
                    <div className="profileName">{`${localUser.firstName} ${localUser.lastName}` }</div>
                    {/* <div className="profileRunType">{`${users[3].raceType.charAt(0).toUpperCase()}` + `${users[3].raceType.slice(1)}`} Runner</div> */}
                </div>
            </div>
        ):
        <h2>Loading...</h2>
        }
    </div>
>>>>>>> 5a1c9ef6d6218c341c2c0717ba1a5bde6fb6497b
    )
}

const useSearchValue = (initialValue) =>{
    const [userState, setUserState] = useState(initialValue);
    const handlevaluechange =(e) =>{
        setUserState(e.target.value);
        console.log(e.target.value)
    }
    return {
        value: userState,
        onChange: handlevaluechange,
       
    }
}

export default LocalUser