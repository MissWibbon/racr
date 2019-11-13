import React , {useState , useEffect} from 'react'
import API from '../utils/API'

export const RaceContext = React.createContext();

export const Provider  = props =>{
    const [users, setusers] = useState('');
    const [profile, setProfile] = useState({});
    const [isLoading, setLoading] = useState(false);
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

    const getToken = () => {
       const jwt= window.localStorage.getItem('token');
        if(jwt){
            setLocalUser(JSON.parse(jwt))
            setisAuth(true)
        

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
            console.log(res.data)
        })
    }

    useEffect(()=>{
        fetchUsers()
        getToken()
    },[])
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
            addFriend
            }}>
            {props.children}
        </RaceContext.Provider>
    )
}

