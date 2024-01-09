import React, { useState } from 'react'
import axios from 'axios';

const CitiesList = ({onselect}) => {
    const cities = ["Marseille", "Paris", "New York"]
    const [selectedCity, setSelectedCity] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        try {
          axios.post('http://localhost:8800/city', {
            selectedCity: value
          });
        } catch (error) {
          console.error('Erreur lors de la requête vers le backend :', error);
        }
    
        setSelectedCity(value);
      };

        
    
  return (
    
        <div className='wrapper' >
            
            <form className='forms'>
    <label>
    <h4> Choisissez votre ville </h4> 
    <select onChange={handleChange} className='inputform' value={selectedCity}>
            <option value="choisir une ville">Sélectionnez une ville</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
    </label>
    </form>    
        </div>
    )
   
}

export default CitiesList;
