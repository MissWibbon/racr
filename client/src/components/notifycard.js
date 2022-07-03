import React, { useContext, useEffect, useState } from 'react'
import { RaceContext } from './appstate'
import { Link } from 'react-router-dom'
import API from '../utils/API'
import { socket } from '../socket'

const NotifyCard = (props) => {
    const context = useContext(RaceContext)
    const { setStats, notifications, setLiveRace, setNotifications, addRace } = context
    const [player, setPlayer] = useState({})
    const [declineRace, setDeclineRace] = useState(false)
    const id = props.data.raceId
    const minutes = props.data.minutes
    const miles = props.data.miles
    const kilometers = props.data.kilometers
    const message = props.data.message
    const goal = props.data.goal
    console.log(goal)
    const [cCode, setCCode] = useState('')
    const [messageShow, setMessageShow] = useState(false)
    let requestData = notifications.filter(function (request) {
        return request.raceId === id
    })
    let remainingRequests = notifications.filter(function (request) {
        return request.raceId !== id
    })
    console.log(requestData)
    console.log(remainingRequests)
    useEffect(() => {
        API.getOneUser(props.data.requestor)
        .then(res => {
            setPlayer(res.data)
            setCCode(res.data.countryCode.toLowerCase())
        })
    }, [])

    const accept = () => {
        setStats(JSON.stringify(props.data))
        props.data.status = "accepted"
        console.log(props.data)
        addRace(props.data)
        API.getOneUser(props.data.requestor)
            .then(res => {
                const requestor = res.data
                requestor.races.push(props.data)
/*                 API.editUser(requestor)
                    .then((res) => { console.log(res) })
                    .catch(error => {
                        console.error('There was an error!', error);
                    }) */
            })
        API.getOneUser(props.data.acceptor)
            .then(res => {
                const acceptor = res.data
                acceptor.races.push(props.data)
/*                 API.editUser(acceptor)
                    .then((res) => { console.log(res) })
                    .catch(error => {
                        console.error('There was an error!', error);
                    }) */
            })
        API.getUsers()
        //API.raceAccept(props.data)
        //API.saveRace(props.data)
        socket.emit('accepted', props.data)
        props.history.push('/racetest')
        props.history.push(props.data)
        props.staticContent = props.data
        localStorage.setItem('stats', JSON.stringify(props.data))
        localStorage.setItem('liveRace', JSON.stringify(requestData))
        //setNotifications(remainingRequests)
        localStorage.setItem('notifications', JSON.stringify(remainingRequests))
        setLiveRace(requestData)
        console.log(requestData)

    }

    const decline = (e) => {
        console.log(e.target)
        setDeclineRace(true)
        localStorage.setItem('notifications', JSON.stringify(remainingRequests))
        console.log('decline')
        setNotifications(remainingRequests)
    }


    return (
        <div className="challenge-response" id={id}>
            <div>
                <div className="challenge-label">
                    <div className="challengePlayerImg" style={{ backgroundImage: "url(" + props.data.requestorImage + ")" }}>
                        <img src={`https://hatscripts.github.io/circle-flags/flags/${props.data.requestorCountryCode.toLowerCase()}.svg`} width="10" className="flag-icon" alt={props.data.requestorCountry} />
                    </div>
                {props.data.message != "" ? <div className="speech-bubble">{props.data.message}</div> :''}
                    <Link className="opponentName" to={`/users/${props.data.requestor}`}>{props.data.requestorName} </Link> has challenged you to race for
                    <div className="timechallenge">
                        {minutes > 0 ? minutes + ' minutes' : ''}</div>
                    <div className="distance">{miles > 0 ? miles + ' miles' : ''} {kilometers > 0 ? kilometers + ' kilometers' : ''}</div>
                </div>
                <div className="responseButtonWrap">
                    <button id="acceptChallenge" className="accept-race" onClick={accept}>Accept</button>
                    <button id="declineChallenge" className="decline-race" noteId={id} onClick={decline}>Decline</button>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}

export default NotifyCard