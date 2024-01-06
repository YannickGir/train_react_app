import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../App.css';
import SignInForm from '../components/SignInForm';

export default function Home() {
    const {id} = useParams()
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    //RESTE A AJOUTER handleSignIn ici et mettre la logique signup ailleurs dans une nouvelle page signUp 
    //Créer le controller signin avec la route qui l'utilise


const handleSignIn = async(name, email) => {
    try {
        const response = await axios.post("http://localhost:8800/signIn", {
            name,
            email,
          });
          if (response.status >= 200 && response.status < 300) {
            localStorage.setItem('userSession', 'connected');
            navigate("1/:id") ;
          }else {
            console.error('Erreur de la connection :', response.data);
          }
    } catch (err) {
        if (err.response && err.response.status === 409) {
            console.log('merci d\'inscrire un identifiant valide');
            setModalIsOpen(true);
          } else {
            console.error('Erreur lors de la connection :', err);
          }
    }
}

    const handleSignUp = async (name, email) => {
        try {
          const response = await axios.post("http://localhost:8800/signUp", {
            name,
            email,
          });
          console.log(response.data); 
          console.log(response.status);
          if (response.status === 409) {
            console.log('utilisateur existe déjà');
            setModalIsOpen(true)
          }
          if (response.status >= 200 && response.status < 300) {
            
            localStorage.setItem('userSession', 'connected');
            navigate("1/:id") ;
          } else {
            
            console.error('Erreur d\'inscription :', response.data);
          }
        } catch (err) {
            if (err.response && err.response.status === 409) {
                console.log('utilisateur existe déjà');
                console.log('Détails de la réponse du serveur :', err.response.data);
                setModalIsOpen(true);
              } else {
                
                console.error('Erreur lors de l\'inscription :', err);
              }
        }
      
      };
  return (
    <div >
        <h1> HOME </h1>
        <p> My id : {id} </p>
        <Modal className='modal'
        
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  contentLabel="Exemple de boîte de dialogue"
>
  <h2>L'email existe déjà !</h2>
  <p>Vous pouvez vous connecter avec vos identifiants ou bien choisir un autre email pour vous inscrire</p>
  <button onClick={() => setModalIsOpen(false)}>Fermer</button>
</Modal>
        {/* <SignUpForm onSignUp={handleSignUp}/> */}
        <SignInForm onSignUp={handleSignIn}/>
        
        
    </div>
  )
}

