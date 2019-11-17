import React , {useContext, useEffect, useState} from 'react'
import {RaceContext} from './appstate'

const FriendPool =({match}) => {
    const context = useContext(RaceContext);
    const {localUser, fetchOneUser, friends, setFriends } = context

    useEffect(()=>{
        if(localUser !== undefined){

            fetchOneUser(localUser._id)
        }
    },[])
    console.log(friends)
    return(
        <div className="friend-list">
    
        </div>

    )



}

export default FriendPool