import React, {useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../App.css';
import SignInForm from '../components/SignInForm';

export default function SignInPage() {
    const {id} = useParams()
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);

const handleSignIn = async(name, email) => {
    try {
        const response = await axios.post("http://localhost:8800/signIn", {
            name,
            email,
          });
          if (response.status >= 200 && response.status < 300) {
            localStorage.setItem('userSession', 'connected');
            navigate("/Home") ;
          }else {
            
            setModalIsOpen(true);
            console.error('Erreur de la connection :', response.data);
          }
    } catch (err) {
        if (err.response && err.response.status === 401) {
            console.log('merci d\'inscrire un identifiant valide');
            setModalIsOpen(true);
          } else {
            console.error('Erreur lors de la connection :', err);
          }
    }
}

  return (
    <div >
        <h1> Connectez vous ! </h1>
        <Modal className='modal'
        
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  contentLabel="boîte de dialogue"
>
  <h2>L'email n'existe pas !</h2>
  <p>Vous pouvez vous inscrire en cliquant sur le bouton s'inscrire !</p>
  <button style={{padding:'8px', margin:'8px'}}> 
                        <Link to={'/SignUpPage'} >S'inscrire</Link>
                    </button> 
  <button onClick={() => setModalIsOpen(false)}>Fermer</button>
</Modal>
        {/* <SignUpForm onSignUp={handleSignUp}/> */}
        <SignInForm onSignIn={handleSignIn}/>
        
        
    </div>
  )
}

