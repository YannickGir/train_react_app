"use client"

import React, { useState } from 'react'

const SignUpForm= ({ onSignUp }) => {
    const [userDatas, setUserDatas] = useState({
        username: "",
        email: "",
        // password_hash: "",
        // id: 0,
        // created_at: new Date(),
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDatas((prev) => ({...prev, [name]: value}))

    }
    const handleClick = async (e) => {
        e.preventDefault();
        onSignUp(userDatas.username, userDatas.password_hash, userDatas.email);
    }

    return (
        <div className='wrapper' >
            
            <form className='forms'>
    <label>
    <h2> Username </h2> 
        <input onChange={handleChange} className='inputform' type="text" name="username" value={userDatas.username} />
    </label>

    <label>
        <h2> Email </h2> 
        <input onChange={handleChange} className='inputform' type="text" name="email" value={userDatas.email}/>
    </label>

    <label>
        <h2> password </h2> 
        <input onChange={handleChange} className='inputform' type="text" name="password_hash" value={userDatas.password_hash} />
    </label>

    </form>
    <button onClick={handleClick} >Inscription</button> 
            
        </div>
    )
}
export default SignUpForm;
