import React, {useContext, useEffect, useState}from 'react'
import {RaceContext} from './appstate'
import ReactSearchBox from 'react-search-box'



const User = () =>{
    const context = useContext(RaceContext)
    const {users, isLoading} = context
    const [userState, setUserstate] = useState([]);

 useEffect(() => {
     let tempUserArray = [];
    console.log(userState[0]);
    for(let i in users) {
        tempUserArray.push(users[i].username);
    }

     setUserstate(tempUserArray);
 }, [users])
//users is an array of dummyinfo right now use an index of users  
 console.log(userState);
    return(
        
        <div id="profilePage">
        <ReactSearchBox 
        placeholder = "Placeholder"
        value = "Doe"
        data = {userState}
        callback = {record => console.log(record)}
        />
        {isLoading
        ?(
            <div>
                <div className="profileImage">
                    <img className="imgSrc" src={`${users[0].image}`}/>
                </div>
                <div className="profileLocation">{`${users[0].city}, ${users[0].state} ${users[0].country}` }</div>
                <div class="profileInfo">
                    <div className="profileUserName">{`@${users[0].username}` }</div>
                    <div className="profileName">{`${users[0].firstName} ${users[0].lastName}` }</div>
                    <div className="profileRunType">{`${users[0].raceType.charAt(0).toUpperCase()}` + `${users[0].raceType.slice(1)}`} Runner</div>
                </div>
            </div>
        ):
        <h2>Loading...</h2>
        }
        </div>
    )
}
export default User