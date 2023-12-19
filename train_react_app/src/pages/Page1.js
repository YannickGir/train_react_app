import React from 'react'
import { useLoaderData, useParams,NavLink } from 'react-router-dom'


export default function Page1() {
    const {id} = useParams();
    const posts = useLoaderData()


  return <div>
        <h1> Page1 </h1>
        <p> My id : {id} </p> 
        <ul>
        {posts.map((post)=>{
            return <li key={post.id}>
                <NavLink to={post.id}>{post.title}</NavLink>
            </li>
        })}
        </ul>  
    </div>
}

