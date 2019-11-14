import React , {useContext, useEffect, useState} from 'react'
import {RaceContext} from './appstate'

const FriendPool =({match}) => {
    const context = useContext(RaceContext);
    const {localUser, fetchOneUser, friends, setFriends } = context
    console.log(friends)
    return(
        <div>
            {/* <p>boyang</p> */}
        </div>

    )



}

export default FriendPool