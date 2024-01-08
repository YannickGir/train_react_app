
const express = require('express')
const router = express.Router()
const {addUser, logUser} = require('../controller/users')
const { getWeather } = require('../controller/weather')


router.post('/signUp', addUser)
router.post('/signIn', logUser)
router.get('/weather', (req, res)=>{
    getWeather()
    .then(weather => res.status(200).send(weather))
    .catch(err =>res.json(err))
})

module.exports = router;
