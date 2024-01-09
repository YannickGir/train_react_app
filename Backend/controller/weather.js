const axios = require('axios')



const getWeather = async (city)=> {
    console.log(city);
const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=VKYGEMJ5P6ZNVTEZ9PBBSBBAH&contentType=json`
    try {
        const response = await axios.get(url);
        console.log('Réponse de l\'API :', response.data.queryCost);
        return response.data; 
    } catch (error) {
        console.error('Erreur lors de l\'appel API :', error);
        throw error; 
    }
};

module.exports = {getWeather};