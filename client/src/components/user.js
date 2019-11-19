
import React, {useContext, useEffect, useState}from 'react'
import {RaceContext} from './appstate'
import {Link} from 'react-router-dom'
import SearchBar from './searchbar';
const User = ({match}) =>{
    const context = useContext(RaceContext);

    const {id} = match.params
    const {users, isLoading, profile, addFriend, localUser} = context
    const searchbar = useSearchValue('');

    useEffect(() =>{
        context.fetchOneUser(id)
    },[])
    return(
        
        <div id="profilePage">
       <SearchBar></SearchBar>
        {isLoading
        ?(
            <div>
                <div className="profileImage">
                    <img className="imgSrc" src={`${profile.image}`} alt="profile-image"/>
                    <button onClick = {() => addFriend({id, friendId:localUser._id})} id="add-friend-btn">Add friend</button>
                    <div className="locationWrap">
                        <div className="profileLocation">{`${profile.city}, ${profile.state} ${profile.country}` }</div>
                    </div>
                </div>
                <div class="profileInfo">
                    <div className="profileUserName">{`${profile.userName}` }</div>
                    <div className="profileName">{`${profile.firstName} ${profile.lastName}` }</div>
                    <Link to = {`/users/${id}/challengeform`}><button id="challenge-friend-btn"></button></Link>
                </div>
            </div>
        ):
        <h2>Loading...</h2>
        }
        </div>
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
export default User