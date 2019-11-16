import React , {useContext, useEffect, useState} from 'react'
import {RaceContext} from './appstate'

const FriendPool =({match}) => {
    const context = useContext(RaceContext);
    const {localUser, fetchOneUser, friends, setFriends } = context
    console.log(friends)
    return(
        <div>
            {friends.map(friend =>
            (
                <div>{friend.userName}</div>
            )
            )}
        </div>

    )



}

export default FriendPool