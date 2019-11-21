import React, { useState, useContext } from 'react'
import { RaceContext } from './appstate'


const SearchBar = (props) => {
    const context = useContext(RaceContext)
    const { fetchOneUser } = context
    const searchbar = useSearchValue('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const query = `?userName=${searchbar.value}`
        fetchOneUser(query)
            .then(res => props.history.push(`/users/${res._id}`))
    }
    return (
        <>
            <input type='text'
                {...searchbar}
                placeholder='Enter Username Here'
            ></input>
            <button id="searchFriend" onClick={handleSubmit}><i className="fas fa-search"></i></button>
        </>
    )
}
const useSearchValue = (initialValue) => {
    const [userState, setUserState] = useState(initialValue);
    const handlevaluechange = (e) => {
        setUserState(e.target.value);
    }
    return {
        value: userState,
        onChange: handlevaluechange,

    }
}

export default SearchBar