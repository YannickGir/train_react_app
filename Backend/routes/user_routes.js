
const express = require('express')
const router = express.Router()
const {addUser, logUser} = require('../controller/users')
const { getWeather } = require('../controller/weather')


router.post('/signUp', addUser)
router.post('/signIn', logUser)
router.get('/weather', async (req, res) => {
    try {
        const weather = await getWeather();
        console.log('from router ' + weather.data);
        res.status(200).send(weather.data);
    } catch (err) {
        res.json(err);
    }
});


module.exports = router;
