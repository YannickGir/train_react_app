import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Geonames from 'geonames.js';
import {Country} from "country-state-city"

const CitiesListForm = ({onSelectCity}) => {

    const cities = ["Marseille", "Paris", "New York", "hong-kong", "ouagadougou", "syndey", "toronto", 'montreal', 'mont-tremblant']
    const [selected, setSelected] = useState(cities[0]);
    const [selectedCity, setSelectedCity] = useState("Marseille");
    const [filteredCities, setFilteredCities] = useState([]);

    const handleChange = (e) => {
        
        const { value } = e.target;
        setSelectedCity(value);
        onSelectCity(value)
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

export default CitiesListForm;
