import React from 'react'
import { useParams } from 'react-router-dom'


export default function Page1() {
    const {id} = useParams(1)
  return (
    <div>
        <h1> Page2 </h1>
        <p> My id : {id} </p>
        
    </div>
  )
}

