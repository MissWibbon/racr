import React from 'react'

// this card will take data passed to it through props and make a card for friends
//simply use the info in props.data
const FriendCard = (props) =>{

    console.log(props.data)
    return(
            <div className="friendCard">
                <img className="playerImg" src={props.data.image}/>
                <h3 className="friendUserName">@{props.data.userName}</h3>
                <div className="city">{props.data.city}, {props.data.state} {props.data.country}</div>
            </div>
    )
}

export default FriendCard