import React, {useContext} from 'react'

import {NavLink} from 'react-router-dom'
import {RaceContext} from './appstate'




const Navbar = () =>{
    const context = useContext(RaceContext);
    const {isAuth} = context;

    return(
        <div>
            {isAuth
            ?(
            <div className="navWrapper">
                <NavLink className="navLink" exact to = '/home'><i className="fas fa-user"></i></NavLink>
                <NavLink className="navLink" exact to = '/notifications'><i className="fas fa-bell"></i></NavLink>
                <NavLink className="navLink" exact to = '/race'><i className="fas fa-running"></i></NavLink>
                <NavLink className="navLink" exact to = '/users'><i className="fas fa-search"></i></NavLink>
                <NavLink className="navLink" exact to = '/login'><i className="fas fa-sign-out-alt"></i></NavLink>
            </div>
            
            ): null}
        </div>
    )
}


export default Navbar