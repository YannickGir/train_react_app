import { useEffect, useState }from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Page1() {
    const {id} = useParams()

    useEffect(()=>{
        axios.get('')
    }, [])
  return (
    <div>
        <h1> Page2 </h1>
        <p> My id : {id} </p>
    
        
    </div>
  )
}

