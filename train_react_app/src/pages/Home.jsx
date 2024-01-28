import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../App.css';
import UseSessionExpiration from '../Custom hooks/UseSessionExpiration';
import Selector from '../components/Selector';
import {City, Country, State} from "country-state-city"

export default function Home() {
    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState();
    const [cityData, setCityData] = useState();
    const [country, setCountry] = useState(countryData[0]);
    const [state, setState] = useState()
    const [city, setCity] = useState()
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [selectedCity, setSelectedCity] = useState("Marseille"); 
    const [dateNow, setDateNow] = useState("");
    const [timeHourNow, setTimeHourNow] = useState ("");
    const [timeMinutesNow, setTimeMinutesNow] = useState();
    const [datasWeather, setDatasWeather] = useState({})

    useEffect(() => {
        const fetchData = async () => {
          try {
            const countries = await Country.getAllCountries();
            setCountryData(countries);
            setCountry(countries[0]);
          } catch (error) {
            console.error('Erreur lors de la récupération des pays :', error);
          }
        };
        fetchData();
      }, []);
       
    useEffect(()=> {
        setStateData(State.getStatesOfCountry(country?.isoCode));
    }, [country])

    useEffect(()=> {
        setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
    }, [state, country?.isoCode, state?.isoCode]) 

    useEffect(()=> {
        stateData && setState(stateData[0])
    }, [stateData])

    useEffect(()=> {
        cityData && setCity(cityData[0])
    }, [cityData])

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
                const cityName = selectedCity && selectedCity.name ? selectedCity.name : "Marseille";
                console.log('ScityName', cityName);
                console.log('selectedCity.name:', selectedCity.name);
                const response = await axios.get(`http://localhost:8800/weather?selectedCity=${cityName}`);
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
                <h3>Bienvenue à {strUcFirst(datasWeather.address)}</h3>
                <h3> le {dateNow}</h3>
                <div style={{display: 'flex' , flexDirection: 'row', marginLeft:'30%'}}>
                    Heure locale : {timeHourNow} : {timeMinutesNow}
                </div>  
                    Heure du pays choisi :  {datasWeather && datasWeather.currentConditions && datasWeather.currentConditions.datetime}
                    <div style={{display: 'flex', flexDirection: 'column', marginLeft:'30%', marginTop:'5%', marginBottom:'5%'}}
                        className= 'selection:text-black selection:bg-teal-500 bg-gradient-to-r from-teal-400 to-teal-500'>
                            <div style={{ marginBottom:'5%'}} className='flex flex-wrap gap-3 bg-teal-300 rounded-lg p-8'>
                            <p style={{ marginRight:'3%'}}> Pays : </p>  
                                <Selector  data={countryData} selected={country} setSelected={setCountry}  />
                            </div> 
                            {state && (<div style={{ marginBottom:'5%'}} className='flex flex-wrap gap-3 bg-teal-300 rounded-lg p-8'>
                                <p style={{ marginRight:'3%'}}>Région</p> 
                                <Selector data={stateData} selected={state} setSelected={setState}/>
                            </div> )}
                            {city && (
                                <div className='flex flex-wrap gap-3 bg-teal-300 rounded-lg p-8'>
                                    <p style={{ marginRight:'3%'}}>Ville</p> 
                                    <Selector data={cityData} selected={city} setSelected={setCity} onSelectCity={(selectedCity) => {
                                    setSelectedCity(selectedCity)}}/>
                                </div> 
                            )}
                    </div>

                <div style={{display: 'flex' , flexDirection: 'row', marginLeft:'30%'}}> 
                    <h3>Météo d'aujourd'hui </h3> 
                    <img style={{marginLeft:'5px'}} src={iconUrl} alt="Weather Icon" />
                </div>
                    <h3>Températures:</h3>
                    {datasWeather.days && datasWeather.days[0] && (
                    <div> 
                        <h4>Maximales : {datasWeather.days[0].tempmax}°  /   Minimales : {datasWeather.days[0].tempmin}°</h4>
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

