import React , {useState , useContext, useEffect} from 'react'
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
            getToken
            }}>
            {props.children}
        </RaceContext.Provider>
    )
}

