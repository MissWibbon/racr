import React, {useContext}from 'react'
import {Consumer} from './appstate'


const User = () =>{
 const context = useContext(Consumer);
 const user = context.actions.fetchUsers()
 
    return(
        <div>
            {user[0]}
        </div>
    )
}
export default User