
import React , {useContext, useEffect, useState} from 'react'
import API from '../utils/API'
import {RaceContext} from './appstate'
import FriendCard from './friendCard'


const FriendPool = (props) => {
    const {match} = props;
    const context = useContext(RaceContext);

    const {localUser, users, fetchOneUser, friends, setFriends, isLoading} = context
   const [pool , setPool] = useState([])


   const getfriends =() =>{

       if(localUser ===undefined){
           return false

       } else{
               
               localUser.friends.map(friend =>{
                API.getOneUser(friend)
                    .then(res =>{
                        console.log(res.data)
                        setPool((prevState)=> [res.data, ...prevState])
                        
                    })
                    .catch(err => console.log(err))
               })
           return true
       }
   }

    useEffect(()=>{

    getfriends()
    },[])
    console.log('friends..')

    console.log(friends + ' friends')
    return (
        <div className="friendPage"><h2 className="pageTitle">Your Friends</h2>
            {isLoading 
            ?(
                <>
                {
                    pool.map(friend =>
                    (
                        <FriendCard  key ={friend._id}  {...props} data ={friend}></FriendCard>

                    )
                    
                    )
                }
                </>

            )
            :(
                <h3>...Loading</h3>
            )
            }
        </div>
    )




}

export default FriendPool