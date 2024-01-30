"use client"

import React, { useState } from 'react'

const SignInForm= ({ onSignIn }) => {
    const [userDatas, setUserDatas] = useState({
        name: "",
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
        onSignIn(userDatas.name, userDatas.email);
    }

    return (
        <div className='wrapper' >
            
            <form className='forms'>
    <label>
    <h2> Username </h2> 
        <input style={{color:'black'}} onChange={handleChange} className='inputform' type="text" name="name" value={userDatas.username} />
    </label>

    <label>
        <h2> Email </h2> 
        <input style={{color:'black'}}  onChange={handleChange} className='inputform' type="text" name="email" value={userDatas.email}/>
    </label>
    <br/>
    <button className="customButton" onClick={handleClick} >Se connecter</button>
    {/* <label>
        <h2> password </h2> 
        <input onChange={handleChange} className='inputform' type="text" name="password_hash" value={userDatas.password_hash} />
    </label> */}

    </form>
     
            
        </div>
    )
}
export default SignInForm;
