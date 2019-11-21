
import React , {useContext, useEffect, useState} from 'react'
import API from '../utils/API'
import {RaceContext} from './appstate'


const FriendPool = ({ match }) => {
    const context = useContext(RaceContext);

    const {localUser, users, fetchOneUser, friends, setFriends } = context
    const localFriends = [];

    function getFriendsData(friend){

    }

    useEffect(()=>{
        if(localUser !== undefined){
            console.log(users)
            users && users.forEach(user => {
                console.log(user)
                console.log(user._id + "user Id")
            })

            localUser.friends.forEach(id => {
                API
                .getOneUser(id)
                .then(result => {
                
               
                     console.log(id)
                } 
                );
            });
           

            //fetchOneUser(localUser._id)
               // add api.getUsers - tyfal
               
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