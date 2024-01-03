import React from 'react'
import { useParams } from 'react-router-dom'
import SignUpForm from '../components/SingUpForm'

export default function Home() {
    const {id} = useParams()
    const handleSignUp = async (username: string, password_hash: string, email:string) => {
        console.log('Tentative de connexion avec username :', username, 'et password :', password_hash);
      
        try {
          const response = await axios.post("http://localhost:8800/api/signUp", {
            username,
            password_hash,
            email,
          });
    
          if (response.status === 200) {
            // L'utilisateur est inscrit avec succès.
            router.push('Dashboard'); // Exemple de redirection vers la page de tableau de bord.
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

