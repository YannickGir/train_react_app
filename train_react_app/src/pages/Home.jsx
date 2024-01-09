import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../App.css';
import UseSessionExpiration from '../Custom hooks/UseSessionExpiration';
import CitiesListForm from '../components/CitiesListForm';

export default function Home() {
    // const {id} = useParams()
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [selectedCity, setSelectedCity] = useState("Marseille"); 
    const [dateNow, setDateNow] = useState("");
    const [timeHourNow, setTimeHourNow] = useState ("");
    const [timeMinutesNow, setTimeMinutesNow] = useState();
    const [datasWeather, setDatasWeather] = useState({})
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
  
      const getWeather = async () => {
        try {
          const response = await axios.get(`http://localhost:8800/weather?selectedCity=${selectedCity}`);
          setDatasWeather(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des données météorologiques :', error);
        }
      };

      getWeather();
      return () => clearInterval(intervalId);
    } else {
      navigate('/');
    }
  }, [navigate, setAuthenticated, selectedCity]);

  function strUcFirst(a) {
    return (a+'').charAt(0).toUpperCase() + (a+'').substr(1);
  }
  const iconUrl = datasWeather.days && datasWeather.days[0] 
  ? `/iconswheather/${datasWeather.days[0].icon}.png` 
  : null;

  return (
    <UseSessionExpiration> 
    <div className='home' >
        <h1> HOME </h1>
        <h2>Bienvenue à {strUcFirst(datasWeather.address)}</h2>
        <h2> le {dateNow}</h2>
        <h3>{timeHourNow} : {timeMinutesNow}</h3>

        <h2>Météo d'aujourd'hui :</h2>
        <CitiesListForm onSelectCity={(city) => setSelectedCity(city)}/>  
        <h3>Températures:</h3> {datasWeather.queryCost}
         {datasWeather.days && datasWeather.days[0] && (
                <div>
                    <h4>Maximales : {datasWeather.days[0].tempmax}°</h4>
                    <h4>Maximales : {datasWeather.days[0].tempmin}°</h4>
                    <img src={iconUrl} alt="Weather Icon" />
                </div>
            )}
        

        
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
    </UseSessionExpiration>
  )
}

