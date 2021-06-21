
import React, { useContext, useEffect, useState } from 'react'
import API from '../utils/API'
import { RaceContext } from './appstate'
import UserCard from './userCard'


const UserPool = (props) => {
    const context = useContext(RaceContext);

    const { localUser, friends, isLoading, users } = context
    const [pool, setPool] = useState([])


    const getusers = () => {

        if (localUser === undefined) {
            return false

        } else {

            users.map(user => {
                API.getOneUser(user)
                    .then(res => {
                        console.log(res.data)
                        setPool((prevState) => [res.data, ...prevState])

                    })
                    .catch(err => console.log(err))
            })
            return true
        }
    }

    useEffect(() => {

        getusers()
    }, [])
    console.log('friends..')

    console.log(friends + ' friends')
    return (
        <div className="users"><h2 className="pageTitle">Users</h2>
            {isLoading
                ? (
                    <>
                        <div className="friendPageSearch"></div>
                        <>
                            {
                                pool.map(user =>
                                (
                                    <UserCard key={user._id}  {...props} data={user}></UserCard>

                                )

                                )
                            }
                        </>
                    </>
                )
                : (
                    <h3>...Loading</h3>
                )
            }
        </div>
    )




}

export default UserPool