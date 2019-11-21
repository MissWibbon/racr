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
    let acceptorId = null
    let localId = localUser._id
    let requestorname = null
    let hours = null
    let minutes = null
    let seconds = null
    let acceptorName = null
    let message = null
    let values = null

    console.log(localUser)
    console.log("+++++++++++++++++")
    if (Array.isArray(notifications) && notifications.length > 0) {

        console.log(notifications[0])
        requestorId = notifications[0] && notifications[0].requestor
        acceptorId = notifications[0] && notifications[0].acceptor
        hours = notifications[0] && notifications[0].hours
        minutes = notifications[0] && notifications[0].minutes
        seconds = notifications[0] && notifications[0].seconds
        message = notifications[0] && notifications[0].message
        console.log("requestor:" + requestorId, "acceptor" + acceptorId, "message: " + message)

    }

    console.log('==========')
    if (Array.isArray(users) && requestorId) {
        console.log(users)
        const user = users.find(item => {
            console.log(requestorId, item, item.userName)
            acceptorName = item.userName
            return item._id === requestorId
        })
    }
    console.log(acceptorName)
    console.log('----------')
    const notify = []
    const noticeArray = Object.keys(notifications).map(i => notifications[i])
    const notificationArray = Object.keys(noticeArray).map(i => noticeArray[i])
    const firstNotification = notificationArray[0]
    notify.push(firstNotification)
    console.log("console log 2")
    console.log(noticeArray)
    console.log("console log 3")
    const notifyMap = () => {
        for (let [key, value] of Object.entries(notifications)) {
            values = Object.entries(value).map(i => notifications[i])

            console.log(`${key}: ` + values);
        }
    }
    notifyMap()
    console.log("console log 4")
    console.log(notify)

    return (

        <div id="challengeModal">
            {isLoading
                ? (
                    notifications
                        ? (
                            <div className="challenge-response">
                                <div className="challenge-label">
                <div className="opponentName"> @{acceptorName} </div> wants to race you for
                                    in a <div className="distance">{hours} Hour, {minutes} Minute, {seconds} Seconds</div></div>
                                    <div className="message">Their message to you: {message}</div>
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