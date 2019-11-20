import React, { useContext, useEffect, useState } from 'react'
import ChallengeForm from './challengeForm'
import { RaceContext } from './appstate'
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

const ChallengeResponse = (props) => {
    const { match } = props;
    const context = useContext(RaceContext);
    const { id } = match.params
    const { users, isLoading, localUser, profile, notifications } = context
    const Accept = (e) => {
        e.preventDefault()
        socket.emit('startrace', { msg: 'just started' })
        props.history.push('/ractest')
    }

    let requestorId = null
    if (Array.isArray(notifications) && notifications.length > 0) {

        console.log(notifications[0])
        requestorId = notifications[0] && notifications[0].acceptor
    }

    console.log('==========')
    if (Array.isArray(users) && requestorId) {
        console.log(users)
        const user = users.find(item => {
            console.log(requestorId, item)
             return item._id === requestorId
        })
        console.log(user, user.userName)
    }
    console.log('----------')
    const notify = []
    const noticeArray = Object.keys(notifications).map(i => notifications[i])
    const notificationArray = Object.keys(noticeArray).map(i => noticeArray[i])
    const firstNotification = notificationArray[0]
    const noticeString = JSON.stringify(notifications[0])
    notify.push(firstNotification)
    const notifyReplace = notify[0]
    console.log(noticeString)
    console.log(noticeArray)
    console.log(notifyReplace)
    const notifyMap = () => {
        for (let [key, value] of Object.entries(notify)) {
            console.log(`${key}: ${value}`);
        }
    }
    console.log(notify)

    // const toNumericPairs = input => {
    //     const entries = Object.entries(notifiers);
    //     entries.forEach(entry => entry[0] = +entry[0]);
    //     return entries;
    //   }
    //   console.log(toNumericPairs(notifiers))

    // console.log(Object.entries(notifiers))

    // const request = Object.entries(note)
    // console.log(request)

    return (

        <div id="challengeModal">
            {isLoading
                ? (
                    notifications
                        ? (
                            <div className="challenge-response">
                                <div className="challenge-label">You have been invited to race against
                <div className="opponentName"></div>
                                    in a <div className="distance"></div> race</div>
                                <button id="submitButton" className="accept-race" onClick={Accept}>Accept</button>
                                <button id="submitButton" className="decline-race"><a href="/home">Decline</a></button>
                            </div>

                        )
                        : <h3>no new notifications</h3>
                ) :
                <h2>Loading...</h2>
            }
        </div>
    )
}


export default ChallengeResponse