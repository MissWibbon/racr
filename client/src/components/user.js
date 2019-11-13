import React, {useContext, useState}from 'react'
import {RaceContext} from './appstate'
<<<<<<< HEAD:client/src/components/user.js
const User = () =>{
    const context = useContext(RaceContext)
    const {users, isLoading} = context
    const searchbar = useSearchValue('')
=======
import ReactSearchBox from 'react-search-box'



const User = ({match}) =>{
    const context = useContext(RaceContext)
    const {id} = match.params
    const {users, isLoading} = context
    const searchbar = useSearchValue('')
    let profile = {};

    useEffect(() =>{
        profile = context.fetchOneUser(id)
    },[])
    console.log(localUser)
>>>>>>> master:frontend/src/components/user.js
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
<<<<<<< HEAD:client/src/components/user.js
                    <img className="imgSrc" alt="" src={`${users[0].image}`}/>
                <div className="locationWrap">
                    <div className="profileLocation">{`${users[0].city}, ${users[0].state} ${users[0].country}` }</div>
                </div>
                </div>
                <div class="profileInfo">
                    <div className="profileUserName">{`@${users[0].userName}` }</div>
                    <div className="profileName">{`${users[0].firstName} ${users[0].lastName}` }</div>
=======
                    <img className="imgSrc" src={`${profile.image}`}/>
                </div>
                <div class="profileInfo">
                    <div className="profileUserName">{`${profile.userName}` }</div>
                    <div className="profileName">{`${profile.firstName} ${profile.lastName}` }</div>
                    <div className="profileLocation">{`${profile.city}, ${profile.state} ${profile.country}` }</div>
>>>>>>> master:frontend/src/components/user.js
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