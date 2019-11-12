import React , {useState , useEffect} from 'react'
import API from '../utils/API'

export const RaceContext = React.createContext();

export const Provider  = props =>{
    const [users, setusers] = useState('');
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
            isLoading,
            fetchUsers,
            localUser,
            getToken
            }}>
            {props.children}
        </RaceContext.Provider>
    )
}

