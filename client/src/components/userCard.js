import React from 'react'


const UserCard = (props) => {


    return (
        <div id="usersList">

            <div key={props._id}>
                <div className="usersImg">
                    <img className="usersImgSrc" src={`${props.image} `} alt="profile-img" />
                </div>
                <div className="usersName">{props.userName}</div>
            </div>

        </div>

    )
}

export default UserCard
