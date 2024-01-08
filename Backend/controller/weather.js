const axios = require('axios')

const city = 'marseille'

const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=VKYGEMJ5P6ZNVTEZ9PBBSBBAH&contentType=json`

const getWeather = async ()=> {
    
    const weatherDatas = await axios.get(url)
    .then(response => {
        console.log('Réponse de l\'API :', response.data + 'date : ' + dateNow + ' heure ' + timeHourNow + ' minutes ' + timeMinutesNow);
      })
      .catch(error => {
        console.error('Erreur lors de l\'appel API :', error);
      });
}

module.exports = {getWeather};