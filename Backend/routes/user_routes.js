
const express = require('express')
const router = express.Router()
const {addUser, logUser} = require('../controller/users')
const { getWeather } = require('../controller/weather')


router.post('/signUp', addUser)
router.post('/signIn', logUser)
router.post('/city', async (req, res) => {
    try {
        console.log('Received request to /city');
        const selectedCity = req.body.selectedCity;
    console.log('from router cityfromfront ' + selectedCity);
    } catch (err) {
        res.json(err);
    }
});
router.get('/weather', async (req, res) => {
    try {
        const weather = await getWeather();
        res.status(200).send(weather);
        console.log('from router ' + weather.days[0].datetime);
    } catch (err) {
        res.json(err);
    }
});


module.exports = router;
