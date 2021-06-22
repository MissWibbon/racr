import React, { useState, useEffect } from 'react'
import API from '../utils/API'
import io from 'socket.io-client';
const socket = io('https://secret-ravine-23221.herokuapp.com');



export const RaceContext = React.createContext();

export const Provider = props => {
    const [users, setusers] = useState('');
    const [profile, setProfile] = useState({});
    const [isOnline, setOnline] = useState(false);
    const [requestorId, setRequestorId] = useState("");
    const [notifications, setNotifications] = useState(JSON.parse(localStorage.getItem('notifications')) || []);
    const [tempNotifications, setTempNotifications] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [friends, setFriends] = useState(JSON.parse(localStorage.getItem('friends'))|| []);
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('token')) ||undefined)
    const [isAuth, setisAuth] = useState(false)
    const [room, setRoom] = useState(false)
    const [stats, setStats] = useState({})
    const [race, setRace] = useState(false)
    const [stamp, setStamp] = useState('')
    let mailregx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [errorMsg, setErrorMsg] = useState(false)



    
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
            setLocalUser(JSON.parse(jwt))

            setisAuth(true)
            return true
        }


    }

    const addFriend = (data) => {
        let { id, friendId } = data;
        let temp = '';
        API.getfriend(data)
            .then(res => {
            })
        temp = id;
        id = friendId;
        friendId = temp
        const newData = { id, friendId }
        API.getfriend(newData)
            .then(res => {
                localStorage.setItem('friends', JSON.stringify([localUser.friends, friendId]))
                setFriends(friendId)
            })
    }

    useEffect(() => {
        fetchUsers()
        getToken()


    }, [])


    socket.on('some event', function (data) {

    });
    socket.on('welcome', function (data) {
    });
    socket.on('ask', () => {
        if (localUser === undefined) {
            return false
        } else {

            socket.emit('online', { localUser })
        }
    })
    socket.on('event', data => {
    })

    socket.on('challengeresponse', (data) => {
        return (
            setNotifications((prevState) => {
                if (prevState.indexOf(data) > -1) {
                    return prevState

                } else {
                    localStorage.setItem('notifications', JSON.stringify([...prevState, data]))
                    return [...prevState, data]
                }
            })
        )
    })

    socket.on('startracenow', data => {
        setStats(data)
        setRace(true)

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
            friends,
            setFriends,
            isOnline,
            setOnline,
            notifications,
            setNotifications,
            tempNotifications,
            setisAuth,
            setRoom,
            setStamp,
            stats,
            setStats,
            race,
        }}>
            {props.children}
        </RaceContext.Provider>
    )
}

