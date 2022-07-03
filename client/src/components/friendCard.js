import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { RaceContext } from './appstate';


// this card will take data passed to it through props and make a card for friends
//simply use the info in props.data
const FriendCard = (props) => {
    const context = useContext(RaceContext);
    const { localUser } = context

    return (
        <>
            {props.data._id !== localUser._id ?
                <div className="friendCard">
                    <Link to={`users/${props.data._id}`}>
                        <div className="profile-img-list">
                            <div className="playerImg" style={{ backgroundImage: "url(" + props.data.image + ")" }}></div>
                            <img className="flag-icon" src={`https://hatscripts.github.io/circle-flags/flags/${props.data.countryCode.toLowerCase()}.svg`} width="16" alt={props.data.country} />
                        </div>
                        <h3 className="friendUserName">{props.data.userName}</h3>
                        <div className="city">{props.data.state}</div>
                    </Link>
                </div> :
                <div className="friendCard">
                    <Link to={`/home`}>
                        <div className="profile-img-list">
                            <div className="playerImg" style={{ backgroundImage: "url(" + localUser.image + ")" }}></div>
                            <img className="flag-icon" src={`https://hatscripts.github.io/circle-flags/flags/${localUser.countryCode.toLowerCase()}.svg`} width="16" alt={localUser.country} />
                        </div>
                        <h3 className="friendUserName">{localUser.userName}</h3>
                        <div className="city">{localUser.state} <span className="you">- you</span></div>
                    </Link>
                </div>
            }
        </>
    )
}

export default FriendCard