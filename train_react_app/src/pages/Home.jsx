import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../App.css';

export default function Home() {
    // const {id} = useParams()
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    const [dateNow, setDateNow] = useState("");
    const [timeHourNow, setTimeHourNow] = useState ("");
    const [timeMinutesNow, setTimeMinutesNow] = useState();
useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      setAuthenticated(true);
      const getDateAndHour = () => {
        setDateNow(new Date().toLocaleDateString());
        setTimeHourNow(new Date().getHours());
        setTimeMinutesNow(new Date().getMinutes());
      }
      getDateAndHour()

      const intervalId = setInterval(() => {
        getDateAndHour();
      }, 60000);
  
        const getWeather = async()=> {
            const response = await axios.get("http://localhost:8800/weather")
        }
      return () => clearInterval(intervalId);
    } else {
      navigate('/');
    }
  }, [navigate, setAuthenticated]);

  return (
    <div className='home' >
        <h1> HOME </h1>
        <h2> le {dateNow}</h2>
        <h3>{timeHourNow} : {timeMinutesNow}</h3>
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
        
    </div>
  )
}

