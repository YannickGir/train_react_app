
const express = require('express')
const router = express.Router()
const {addUser, logUser} = require('../controller/users')
const { getWeather } = require('../controller/weather')

let selectedCity = 'Marseille';

router.get('/test', async(req, res)=>
{
    console.log('test !!!!');
})

router.post('/signUp', addUser)
router.post('/signIn', logUser)
// router.post('/city', async (req, res) => {
//     try {
//         console.log('Received request to /city');
//         selectedCity = req.body.selectedCity;
//     console.log('from router cityfromfront ' + selectedCity);
//     } catch (err) {
//         res.json(err);
//     }
// });
router.get('/weather', async (req, res) => {
    selectedCity = req.query.selectedCity
    try {
        const weather = await getWeather(selectedCity);
        res.status(200).send(weather);
        console.log('from router ' + weather.days[0].datetime);
    } catch (err) {
        res.json(err);
    }
});


module.exports = router;
