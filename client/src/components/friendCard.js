import React from 'react'
import  {Link} from 'react-router-dom'
import SearchBar from './searchbar';


// this card will take data passed to it through props and make a card for friends
//simply use the info in props.data
const FriendCard = (props) =>{

    return(
        <>
            <div className="friendCard">            
                <Link to ={`users/${props.data._id}`}>
                <img className="playerImg" src={props.data.image}/>
                <h3 className="friendUserName">{props.data.userName}</h3></Link>
                <div className="city">{props.data.city}, {props.data.state} {props.data.country}</div>
            </div>
            </>
    )
}

export default FriendCard