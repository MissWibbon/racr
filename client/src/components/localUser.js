import React, {useContext, useState}from 'react'
import {RaceContext} from './appstate'



const LocalUser = () =>{
    const context = useContext(RaceContext)
    const {users,localUser} = context
    const {isLoading} = context
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
                    <img className="imgSrc" src={`${localUser.image}`}/>
                </div>
                <div class="profileInfo">
                    <div className="profileUserName">{`${localUser.userName}` }</div>
                    <div className="profileName">{`${localUser.firstName} ${localUser.lastName}` }</div>
                    <div className="profileLocation">{`${localUser.city}, ${localUser.state} ${localUser.country}` }</div>
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


export default LocalUser