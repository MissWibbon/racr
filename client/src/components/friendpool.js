
import React , {useContext, useEffect, useState} from 'react'
import API from '../utils/API'
import {RaceContext} from './appstate'


const FriendPool = ({ match }) => {
    const context = useContext(RaceContext);

    const {localUser, users, fetchOneUser, friends, setFriends } = context
    let localFriends = []
    let localFriendsId = null
    let friendDets = []
    let friendName = null
    let userId = null
    let userName = null

    function getFriendsData(friend){

    }

    useEffect(()=>{
        if(localUser !== undefined){
            console.log(users)
            users && users.forEach(user => {

                userId = user._id
                userName = user.userName


                console.log(userId + " user ID")
                console.log('00000---------')
                console.log(localFriends)
                console.log('00000')
                console.log(user)
                console.log('user ^this one')
                console.log(user._id + " <= user Id + username => " + user.userName + ' has this many friends ' + user.friends.length)
                
                
                function findArrayElementById(localFriends, userId) {
                    return localFriends.find((userId) => {
                      return userId === localFriendsId
                
                    })
                  }

                 
            })
            
            

            //?
        }

    },[])
    console.log('friends..')

    console.log(friends + ' friends')
    return (
        <div>{localFriends}</div>
    )




}

export default FriendPool