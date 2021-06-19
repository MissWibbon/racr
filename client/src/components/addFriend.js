import React, { useState, useContext } from 'react'
import { RaceContext } from './appstate'



const AddFriend = (props) => {
    const context = useContext(RaceContext)
    const { fetchOneUser } = context

    const handleNewFriend = (e) => {
        e.preventDefault()
        const query = `?userName=${searchbar.value}`
        findOneAndUpdate({ _id: req.params.id }, { $push: { friends: req.body.friendId } })
        fetchOneUser(query)
            .then(res => props.history.push(`/users/${res._id}`))
    }
    return {
        value: userState,
        onChange: handleNewFriend
        (
        
        <div className="addFriend">
            <button id="addFriend" onClick={handleNewFriend}><i class="fas fa-user-friends"></i></button>
        </div>
    )}
}


export default AddFriend