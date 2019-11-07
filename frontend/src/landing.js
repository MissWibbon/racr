import React from 'react'

const Landing =() =>{
    return(
        <div className="loginWrap">
            <form id="login">
                <label id="email">Email:</label>
                <input type ='text' name = 'name'></input>
                <label id="email">Password:</label>
                <input type ='password' name = 'name'></input>
            </form>
        </div>
    )
}
export default Landing