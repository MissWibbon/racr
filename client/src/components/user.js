import React, {useContext, useEffect, useState}from 'react'
import {RaceContext} from './appstate'
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
        <input type= 'text'
        {...searchbar}
        data= {users} 
        placeHolder ='Enter Username Here'
        ></input>
        {isLoading
        ?(
            <div>
                <div className="profileImage">
                    <img className="imgSrc" src={`${profile.image}`}/>
                </div>
                <div class="profileInfo">
                    <div className="profileUserName">{`${profile.userName}` }</div>
                    <div className="profileName">{`${profile.firstName} ${profile.lastName}` }</div>
                    <div className="profileLocation">{`${profile.city}, ${profile.state} ${profile.country}` }</div>
                    <button onClick = {() => addFriend({id, friendId:localUser._id})}>Add friend</button>
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