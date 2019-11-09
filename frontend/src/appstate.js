import React , {useState , useContext, useEffect} from 'react'
import API from './utils/API'

export const RaceContext = React.createContext();

export const Provider  = props =>{
    const [users, setusers] = useState('');
    const [isLoading, setLoading] = useState(false);
    const fetchUsers = () =>{
        API.getUsers()
        .then(res =>{
            console.log(res.data)
            setusers(res.data)
            setLoading(true)
        } )

    }

    useEffect(()=>{

        fetchUsers()
    },[])
    return(
        <RaceContext.Provider value = {{
            users,
            isLoading
            , fetchUsers}}>
            {props.children}
        </RaceContext.Provider>
    )
}

