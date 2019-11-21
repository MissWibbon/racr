import React , {useState , useEffect} from 'react'
import API from '../utils/API'
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

export const RaceContext = React.createContext();

export const Provider  = props =>{
    const [users, setusers] = useState('');
    const [profile, setProfile] = useState({});
    const [isOnline, setOnline] = useState(false);
    const [requestorId, setRequestorId] = useState("");
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [friends, setFriends] = useState(localStorage.getItem('localFriends')|| []);
    const [localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('token')) ||undefined)
    const [isAuth, setisAuth] = useState(false)
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
            localStorage.setItem('friends', [localUser.friends,friendId])
            setFriends(friendId)
            console.log(res.data)
        })
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
        console.log(data)
          return(
            setNotifications((prevState) => {

                localStorage.setItem('notifications',[...prevState, data.data.body])
                return [...prevState, data.data.body]
            })
          )
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
            setisAuth
            }}>
            {props.children}
        </RaceContext.Provider>
    )
}

