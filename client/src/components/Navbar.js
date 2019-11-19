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
                <div className="linkWraps">
                    <NavLink className="navLink" exact to = '/challengeform'><div className="racr-nav-icon small-logo"/></NavLink>
                    <NavLink className="navLink" exact to = '/home'><i className="fas fa-user"></i></NavLink>
                    <NavLink className="navLink" exact to = '/notifications'><div id="notifiy-wrap"><span id="notify-count">0</span></div><i className="fas fa-bell"></i></NavLink>
                    <NavLink className="navLink" exact to = '/users'><i className="fas fa-search"></i></NavLink>
                    <NavLink className="navLink" exact to = '/friends'><i className="fas fa-users"></i></NavLink>
                    <NavLink className="navLink" exact to = '/login'><i className="fas fa-sign-out-alt"></i></NavLink>
                </div>
            </div>
            
            ): null}
        </div>
    )
}


export default Navbar