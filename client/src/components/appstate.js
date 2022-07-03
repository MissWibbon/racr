import React, { useState, useEffect } from 'react'
import API from '../utils/API'
import io from 'socket.io-client';
//const { io } = require("socket.io-client");
const socket = io('https://secret-ravine-23221.herokuapp.com');



export const RaceContext = React.createContext();

export const Provider = props => {
    const [users, setusers] = useState('');
    const [profile, setProfile] = useState({});
    const [isOnline, setOnline] = useState(false);
    const [notifications, setNotifications] = useState(JSON.parse(localStorage.getItem('notifications')) || []);
    const [liveRace, setLiveRace] = useState(JSON.parse(localStorage.getItem('notifications')) || []);
    const [tempNotifications, setTempNotifications] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [friends, setFriends] = useState(JSON.parse(localStorage.getItem('friends'))|| []);
    const [races, setRaces] = useState(JSON.parse(localStorage.getItem('races'))|| []);
    const [notFriends, setNotFriends] = useState(JSON.parse(localStorage.getItem('friends'))|| []);
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('token')) ||undefined)
    const [isAuth, setisAuth] = useState(false)
    const [room, setRoom] = useState(false)
    const [stats, setStats] = useState({})
    const [reqStats, setReqStats] = useState({})
    const [accStats, setAccStats] = useState({})
    const [race, setRace] = useState(false)
    const [raceId, setRaceId] = useState('')
    const [stamp, setStamp] = useState('')
    
    const fetchUsers = (query) => {
        API.getUsers(query)
            .then(res => {
                setusers(res.data)
                setLoading(true)
            })
    }



    const fetchOneUser = async (id) => {
        setLoading(false)
        const res = await API.getOneUser(id)
        setProfile(res.data)
        setLoading(true)
        return res.data[0]
    }

    const getToken = () => {
        const jwt = window.localStorage.getItem('token');
        if (jwt) {
            socket.emit('online', JSON.parse(jwt))
            console.log(socket)
            setLocalUser(JSON.parse(jwt))
            //setFriends(localUser.friends)
            setOnline(true)
            setisAuth(true)
            return true
        }
    }


    const addFriend = (data) => {
        let { id, friendId, profileName, friendName, friendCountry, profileCountry, friendCountryCode, profileCountryCode, friendState, profileState, friendImage, profileImage } = data;
        console.log(data)
        let temp = '';
        let friendOne = {}
        let friendTwo = {}
        friendOne = {_id: id, userName: profileName, image: profileImage, country: profileCountry, countryCode: profileCountryCode, state: profileState}
        friendTwo = {_id: friendId, userName: friendName, image: friendImage, country: friendCountry, countryCode: friendCountryCode, state: friendState}
        console.log([friendOne, friendTwo])
        API.getfriend(data)
        temp = id;
        id = friendId;
        friendId = temp
        profileName = friendTwo.userName
        friendName = friendOne.userName
        profileImage = friendTwo.image
        friendImage = friendOne.image
        profileCountryCode = friendTwo.countryCode 
        friendCountryCode = friendOne.countryCode
        profileCountry = friendTwo.country
        friendCountry = friendOne.country
        profileState = friendTwo.state
        friendState = friendOne.state

        data = { id, friendId, profileName, friendName, friendCountry, profileCountry, friendCountryCode, profileCountryCode, friendState, profileState, friendImage, profileImage }
        let friendItem = {_id: friendId, userName: friendName, image: friendImage, country: friendCountry, countryCode: friendCountryCode, state: friendState}
        console.log(friendItem)
        setFriends('friends', JSON.stringify([localUser.friends, friendItem]))
        API.getfriend(data)
        .then(res => {
                socket.emit('event', res.data)
                socket.emit('newfriend', res.data)
                localStorage.setItem('friends', JSON.stringify([localUser.friends, friendItem]))
                console.log(res)
            })
    }


    const removeFriend = (data) => {
        console.log(data)
        let friendUsers = localUser.friends
        console.log(friendUsers)
        let { id, friendId } = data;
        let temp = '';
        temp = id;
        id = friendId;
        friendId = temp
        console.log(friendId)
        console.log(id)
        console.log(data)
        const newData = { id, friendId }
        console.log(newData)
        API.deletefriend(newData)
            .then(res => {
                console.log(JSON.stringify([localUser.friends, friendId]))
                localStorage.removeItem('friends', friendId)
                setNotFriends(friendId)
                console.log(res)
                
                console.log(JSON.stringify(localStorage.token))
            })
    }

    const addRace = (data) => {
        let {raceId, timestamp, status, acceptor, acceptorCountry, acceptorCountryCode, acceptorImage, acceptorName, goal, kilometers, loser, message, miles, minutes, requestor, requestorCountry, requestorCountryCode, requestorImage, requestorName} = data
        let id = acceptor
        console.log(data.status)
        data.status = "live"
        data = {id, raceId, timestamp, status, acceptor, acceptorCountry, acceptorCountryCode, acceptorImage, acceptorName, goal, kilometers, loser, message, miles, minutes, requestor, requestorCountry, requestorCountryCode, requestorImage, requestorName}
        
        API.raceAccept(data)
            .then(res => {
                console.log(res)
                socket.emit('event', res.data)
                localStorage.setItem('races', JSON.stringify([localUser.races, data]))
                console.log(res)
            })
        id = requestor
        data = {id, raceId, timestamp, status, acceptor, acceptorCountry, acceptorCountryCode, acceptorImage, acceptorName, goal, kilometers, loser, message, miles, minutes, requestor, requestorCountry, requestorCountryCode, requestorImage, requestorName}
        API.raceAccept(data)
            .then(res => {
                console.log(res)
                socket.emit('event', res.data)
                localStorage.setItem('races', JSON.stringify([localUser.races, data]))
                console.log(res)
            })
    }

    useEffect(() => {
        fetchUsers()
        getToken()
    }, [])


    socket.on('some event', function (data) {
    });

    socket.on('welcome', function (data) {
        console.log("welcome user", data._id)
        console.log(data)
        return data
    });

    socket.once('welcome user', function (data) {
        console.log(data)
        //const updateUserList = fetchOneUser(localUser._id)
        //console.log(updateUserList)
        //console.log(localUser.userName + " is online")
        return data
    });
    socket.on('ask', () => {
        if (localUser === undefined) {
            return false
        } else {

            socket.emit('online', { localUser })
        }
    })
    socket.on('event', data => {
        console.log(data)
    })

    socket.on('newfriend', data => {
        console.log(data)
    })

    socket.on('challengeresponse', (data) => {
        return (
            setNotifications((prevState) => {
                console.log(data)
                console.log(prevState)
                if (prevState.indexOf(data) > -1) {
                    return prevState

                } else {
                    localStorage.setItem('notifications', JSON.stringify([...prevState, data]))
                    return [...prevState, data]
                }
            })
        )
    })
    socket.on('liveraces', (data) => {
        //API.raceAccept(data)
        //API.saveRace(data)

        return (
            setLiveRace((prevState) => {
                if (prevState.indexOf(data) > -1) {
                    localStorage.setItem('races', JSON.stringify([...prevState, data]))
                    return prevState

                } else {
                    localStorage.setItem('races', JSON.stringify([...prevState, data]))
                    console.log(liveRace)
                    return [...prevState, data]
                }
            })
        )
    })
    socket.on('racesetting', (data) => {
        //API.raceAccept(data)
        //API.saveRace(data)
        
        return (
            setRaces('races', JSON.stringify([localUser.races, data]))
        )
    })
    socket.on('racedatasetting', (data) => {
        //API.saveRace(data)
        return (
            setRaces((prevState) => {
                console.log(prevState)
                if (prevState.indexOf(data) > -1) {
                    localStorage.setItem('liveRace', JSON.stringify([...prevState, data]))
                    return prevState

                } else {
                    localStorage.setItem('liveRace', JSON.stringify([...prevState, data]))
                    console.log(liveRace)
                    return [...prevState, data]
                }
            })
        )
    })


    socket.on('deleterequest', (data) => {
        return (
            setNotifications((prevState) => {
                if (prevState.indexOf(data) > -1) {
                    console.log(prevState + " if")
                    return prevState

                } else {
                    console.log(prevState + " else")
                    localStorage.setItem('notifications', JSON.stringify([...prevState, data]))
                    return [...prevState, data]
                }
            })
        )
    })

    socket.on('startracenow', data => {
        setStats(data)
        setRace(true)
        setRaceId(data.raceId)

    })
    socket.on('forfeit', data => {
        setRace(false)
    })
    socket.on('setreqstats', data => {
        return (
            console.log(data),
            setReqStats(data),
            socket.emit('requestorstats', data )

        )
    })
    socket.on('setaccstats', data => {
        setAccStats(data)
        socket.emit('acceptorstats', data )

    })

    socket.on('disconnect', function () { });
    return (
        <RaceContext.Provider value={{
            users,
            isAuth,
            profile,
            isLoading,
            fetchUsers,
            localUser,
            fetchOneUser,
            getToken,
            addFriend,
            removeFriend,
            friends,
            notFriends,
            setNotFriends,
            setFriends,
            isOnline,
            setOnline,
            notifications,
            setNotifications,
            tempNotifications,
            addRace,
            liveRace,
            setLiveRace,
            setisAuth,
            setRoom,
            setStamp,
            stats,
            setStats,
            reqStats,
            setReqStats,
            accStats,
            setAccStats,
            race,
        }}>
            {props.children}
        </RaceContext.Provider>
    )
}

