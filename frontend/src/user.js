import React, {useContext}from 'react'
import {Consumer} from './appstate'


const User = () =>{
 const context = useContext(Consumer);
    return(
        <div>
            {context.actions.fetchUsers()}
        </div>
    )
}
export default User