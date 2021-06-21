import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { RaceContext } from './appstate'




const Navbar = () => {
    const context = useContext(RaceContext);
    const { isAuth, notifications } = context;



    return (
        <div className="navWrapper">
            {isAuth
                ? (
                    <div>
                        <div className="linkWraps">
                            <NavLink className="navLink" exact to='/dashboard'><div className="racr-nav-icon small-logo" /></NavLink>
                            <NavLink className="navLink" exact to='/home'><i className="fas fa-user"></i></NavLink>
                            <NavLink className="navLink" exact to='/notifications'><div id="notify-wrap"><span id="notify-count"></span>{notifications.length}</div><i className="fas fa-bell"></i></NavLink>
                            <NavLink className="navLink" exact to='/friends'><i className="fas fa-users"></i></NavLink>
                            <NavLink className="navLink" exact to='/logout'><i className="fas fa-sign-out-alt"></i></NavLink>
                        </div>
                    </div>

                ) : null}
        </div>
    )
}


export default Navbar