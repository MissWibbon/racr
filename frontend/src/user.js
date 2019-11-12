import React, {useContext, useEffect, useState}from 'react'
import {RaceContext} from './appstate'
const User = () =>{
    const context = useContext(RaceContext)
    const {localUser} = context
    const {users, isLoading} = context
    const searchbar = useSearchValue('')
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
                    <img className="imgSrc" src={`${users[0].image}`}/>
                </div>
                <div class="profileInfo">
                    <div className="profileUserName">{`${users[0].userName}` }</div>
                    <div className="profileName">{`${users[0].firstName} ${users[0].lastName}` }</div>
                    <div className="profileLocation">{`${users[0].city}, ${users[0].state} ${users[0].country}` }</div>
                    {/* <div className="profileRunType">{`${users[3].raceType.charAt(0).toUpperCase()}` + `${users[3].raceType.slice(1)}`} Runner</div> */}
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