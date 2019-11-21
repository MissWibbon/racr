
import React , {useContext, useEffect, useState} from 'react'
import API from '../utils/API'
import {RaceContext} from './appstate'


const FriendPool = ({ match }) => {
    const context = useContext(RaceContext);
    const { localUser, fetchOneUser, friends, setFriends } = context

    useEffect(() => {
        if (localUser !== undefined) {

            //fetchOneUser(localUser._id)
               // add api.getUsers - tyfal
               API
               .getOneUser(localUser._id)
               .then(result => {
                   result.data.friends.map(friend => {
                       API
                           .getOneUser(friend)
                           .then(result => console.log(result))
                           .catch(err => console.log(err));
                   })
               })
               .catch(err => console.log(err));
        }

    },[])
    console.log('friends..')

    console.log(friends)
    return (
        <div className="friend-list">

        </div>

    )



}

export default FriendPool