import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../App.css';

export default function SignUpPage() {
    const {id} = useParams()
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);

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
            navigate("/home") ;
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
        <h1> Inscription </h1>
        <Modal className='modal'
        
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  contentLabel="Exemple de boîte de dialogue"
>
  <h2>L'email existe déjà !</h2>
  <p>Vous pouvez vous connecter avec vos identifiants ou bien choisir un autre email pour vous inscrire</p>
  <button onClick={() => setModalIsOpen(false)}>Fermer</button>
</Modal>
        <SignUpForm onSignUp={handleSignUp}/>
        
        
        
    </div>
  )
}

