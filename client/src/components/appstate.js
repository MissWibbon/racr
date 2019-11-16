import React , {useState , useEffect} from 'react'
import API from '../utils/API'
import io from 'socket.io-client';
const socket = io('http://localhost:5000');

export const RaceContext = React.createContext();

export const Provider  = props =>{
    const [users, setusers] = useState('');
    const [profile, setProfile] = useState({});
    const [isOnline, setOnline] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [friends, setFriends] = useState([]);
    const [localUser, setLocalUser] = useState(undefined)
    const [isAuth, setisAuth] = useState(false)
    const fetchUsers = () =>{
        API.getUsers()
        .then(res =>{
            console.log(res.data)
            setusers(res.data)
            setLoading(true)
        } )

    }

    const fetchOneUser = async (id) =>{
        setLoading(false)
        const res = await API.getOneUser(id)
        console.log(res.data)
        setProfile(res.data)
        setLoading(true)
    }
    const getfriends =() =>{
    
        if(localUser ===undefined){
            return null

        } else{
                setFriends(localUser.friends)

        }
    }

    const getToken = () => {
       const jwt= window.localStorage.getItem('token');
        if(jwt){
            setLocalUser(JSON.parse(jwt))
            getfriends()
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
            setFriends((prevState)=>[...prevState,friendId])
            console.log(res.data)
        })
    }

    useEffect(()=>{
        fetchUsers()
        getToken()
        
    },)

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
    socket.on('challenge', () =>{
      return(
       console.log('you just got a challenge')
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
            getfriends
            }}>
            {props.children}
        </RaceContext.Provider>
    )
}

