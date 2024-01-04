import React, { useEffect, useState }from 'react'
import { useLoaderData, useParams,NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Page1() {
    const {id} = useParams();
    const posts = useLoaderData()
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const userSession = localStorage.getItem('userSession');
        if (userSession) {
          setAuthenticated(true);
        } else {
            navigate("/home") ;
        }
      }, [navigate]);

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

