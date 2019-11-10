import React from 'react'

import {NavLink} from 'react-router-dom'

const Navbar = () =>{

    return(
        <div>
            <NavLink exact to = '/home'>Home</NavLink>
            <NavLink exact to = '/notifications'>Notifications</NavLink>
            <NavLink exact to = '/race'></NavLink>
            <NavLink exact to = '/users'>Race</NavLink>
        </div>
    )
}

export default Navbar