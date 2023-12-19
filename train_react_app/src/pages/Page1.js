import React from 'react'
import { useParams } from 'react-router-dom'


export default function Page1() {
    const {id} = useParams(2);


  return <div>
        <h1> Page1 </h1>
        <p> My id : {id} </p>   
    </div>
}

