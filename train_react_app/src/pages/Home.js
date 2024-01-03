import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import SignUpForm from '../components/SingUpForm'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const {id} = useParams()
    const navigate = useNavigate();
    const handleSignUp = async (name, email) => {
        
      
        try {
          const response = await axios.post("http://localhost:8800/", {
            name,
            email,
          });
    
          if (response.status === 200) {
            // L'utilisateur est inscrit avec succès.
            navigate("/home") ;
          } else {
            // Gérer les erreurs d'inscription ici.
            console.error('Erreur d\'inscription :', response.data);
          }
        } catch (err) {
          console.error('Erreur lors de l\'inscription :', err);
        }
      
      };
  return (
    <div>
        <h1> HOME </h1>
        <p> My id : {id} </p>
        <SignUpForm onSignUp={handleSignUp}/>
        
    </div>
  )
}

