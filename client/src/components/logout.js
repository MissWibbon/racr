import React, { useContext, useEffect } from 'react'
import {RaceContext} from './appstate'


const Logout = (props) => {
    const context = useContext(RaceContext);
    const {setisAuth} = context
    useEffect(() => {

        localStorage.removeItem('token')
        localStorage.removeItem('friends')
        localStorage.removeItem('notifications')
        setisAuth(false)
        props.history.push('/login')


    }, [])


    return (
        <div>

        </div>
    )

}

export default Logout