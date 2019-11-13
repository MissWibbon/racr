import React from 'react'

import {NavLink} from 'react-router-dom'

const Navbar = () =>{

    return(
        <div className="navWrapper">
            <NavLink className="navLink" exact to = '/home'><i class="fas fa-user"></i></NavLink>
            <NavLink className="navLink" exact to = '/notifications'><i class="fas fa-bell"></i></NavLink>
            <NavLink className="navLink" exact to = '/race'><i class="fas fa-running"></i></NavLink>
            <NavLink className="navLink" exact to = '/users'><i class="fas fa-search"></i></NavLink>
            <NavLink className="navLink" exact to = '/login'><i class="fas fa-sign-out-alt"></i></NavLink>
        </div>
    )
}

export default Navbar