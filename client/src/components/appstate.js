import React , {useState , useEffect} from 'react'
import API from '../utils/API'
import io from 'socket.io-client';
const socket = io('https://mernracr.herokuapp.com');

export const RaceContext = React.createContext();

export const Provider  = props =>{
    const [users, setusers] = useState('');
    const [profile, setProfile] = useState({});
    const [isOnline, setOnline] = useState(false);
    const [requestorId, setRequestorId] = useState("");
    const [notifications, setNotifications] = useState(JSON.parse(localStorage.getItem('notifications'))||[]);
    const [tempNotifications, setTempNotifications] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [friends, setFriends] = useState(localStorage.getItem('localFriends')|| []);
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('token')) ||undefined)
    const [isAuth, setisAuth] = useState(false)
    const [room, setRoom] = useState(false)
    const [race, setRace] = useState(false)
    const [stamp, setStamp] = useState('')
    const fetchUsers = (query) =>{

        API.getUsers(query)
        .then(res =>{
            console.log(res.data)
            setusers(res.data)
            setLoading(true)
        } )

    }



    const fetchOneUser = async (id) =>{
        setLoading(false)
        const res = await API.getOneUser(id)
        console.log(res.data[0])
        setProfile(res.data)
        setLoading(true)
        return res.data[0]
    }
    const getfriends =() =>{
    
        if(localUser ===undefined){
            return null

        } else{
                
                localUser.friends.map(friend =>{
                    return setFriends((prevState)=>{
                        return [friend, ...prevState]
                    })
                })

        }
    }

    const getToken = () => {
       const jwt= window.localStorage.getItem('token');
        if(jwt){
            socket.emit('online', JSON.parse(jwt) )
            setLocalUser(JSON.parse(jwt))

            setisAuth(true)    
            return true
        }


    }

    const addFriend = (data) =>{
        let {id, friendId}= data;
        let temp = '';
        console.log(data)
        API.getfriend(data)
        .then(res =>{
            console.log(res.data)
        })
        temp = id;
        id= friendId;
        friendId= temp
        const newData = {id, friendId}
        console.log(newData)
        API.getfriend(newData)
        .then(res =>{
            localStorage.setItem('friends', JSON.stringify([localUser.friends,friendId]))
            setFriends(friendId)
            console.log(res.data)
        })
    }
    
    const notify =(data) =>{
        console.log(data);
        // setNotifications((prevState) => {

        //     localStorage.setItem('notifications',[...prevState, data])
        //     return [...prevState, data]
        // })
    }
    useEffect(()=>{
        fetchUsers()
        getToken()

        
    },[])
    

    socket.on('some event', function(data){
        console.log(data)
    });
      socket.on('welcome', function(data){
        console.log('made it')
    });
    socket.on('ask', () =>{
       if (localUser === undefined){
        return false
       }else{
       
         socket.emit('online', {localUser})
      }
    })
    socket.on('event', data =>{
      console.log(data)
    })

    socket.on('challengeresponse', (data) =>{
        console.log('inside challenge response', data)
          return(
            setNotifications((prevState) => {
                if(prevState.indexOf(data) > -1){
                    return prevState

                }else{
                    localStorage.setItem('notifications',JSON.stringify([...prevState, data]))
                    return [...prevState, data]
                }
                })
          )
        })
   
        socket.on('startracenow', data =>{
            console.log(data)
            setRace(true)
            setStamp(data)
        
        })
    
    
    socket.on('disconnect', function(){});
    return(
        <RaceContext.Provider value = {{
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
            race
            }}>
            {props.children}
        </RaceContext.Provider>
    )
}

