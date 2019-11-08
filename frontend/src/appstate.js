import React , {useState} from 'react'
import API from './utils/API'

const RaceContext = React.createContext();

export const Provider  = props =>{
    const [users, setuser] = useState('');
    const fetchUsers = () =>{
        API.getUsers()
        .then(res =>{
            console.log(res.data)
            setuser(res.data)
        } )

    }
    return(
        <RaceContext.Provider value = {{ users,
        actions:{fetchUsers}
        
        }}>
            {props.children}
        </RaceContext.Provider>
    )
}

export const Consumer = RaceContext.Consumer