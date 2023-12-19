import React from 'react'
import { useParams } from 'react-router-dom'


export default function Page1() {
    const {id} = useParams()
  return (
    <div>
        <h1> HOME </h1>
        <p> My id : {id} </p>
        
    </div>
  )
}

