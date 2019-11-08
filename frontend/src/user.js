import React, {useContext}from 'react'
import {RaceContext} from './appstate'


const User = () =>{
 const context = useContext(RaceContext)
 //users is an array of dummyinfo right now use an index of users  
 const {users, isLoading} = context
    return(
        <div>
        {isLoading
        ?(
            <div>{`${users[0].firstName} ${users[0].lastName}` }</div>
        ):
        <h2>Loading...</h2>
        }
        </div>
    )
}
export default User