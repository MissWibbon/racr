import React from 'react'

// this card will take data passed to it through props and make a card for friends
//simply use the info in props.data
const FriendCard = (props) =>{

    console.log(props.data)
    return(
        <h6>{props.data.userName}</h6>
    )
}

export default FriendCard