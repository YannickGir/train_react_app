import React, { useState, useEffect } from 'react'
import axios from 'axios';

const CitiesListForm = ({onSelectCity}) => {
    // const cities = ["Marseille", "Paris", "New York", "hong-kong", "ouagadougou", "syndey", "toronto", 'montreal', 'mont-tremblant']
    const [selectedCity, setSelectedCity] = useState("Marseille");
    const [filteredCities, setFilteredCities] = useState([]);
    const [cities, setCities] = useState([]);
    // const handleChange = (e) => {
    //     const { value } = e.target;
    //     setSelectedCity(value);
    //     onSelectCity(value)
    //   };

    useEffect(() => {
        const fetchCities = async () => {
          try {
            const response = await axios.get(
              'http://www.geonames.org/export/web-services.html#citiesJSON'
            );
    
            // La réponse de l'API Geonames est dans response.data.geonames
            setCities(response.data.geonames);
          } catch (error) {
            console.error('Erreur lors de la récupération des villes :', error);
          }
        };
    
        fetchCities();
      }, []);
    
  return (
        <div className='wrapper' >
            <form className='forms'>
                <label>
                    <h4> Choisissez votre ville </h4> 
                        {/* <select onChange={handleChange} className='inputform' value={selectedCity}>
                            <option value="choisir une ville">Sélectionnez une ville</option>
                            {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                            ))}
                        </select> */}
                       

                </label>
                <ul>
                    {/* {filteredCities.map((city) => (
                        <li key={city.geonameId} onClick={() => handleCitySelect(city.name)}>
                        {city.name}
                        </li>
                    ))} */}

                    {cities.map((city) => (
                        <li key={city.geonameId}>{city.name}</li>
                    ))}

                </ul>
            </form>    
        </div>
    )
   
}

export default CitiesListForm;
