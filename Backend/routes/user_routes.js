const express = require('express')
const router = express.Router()
const {addUser} = require('../controller/users')


router.post('/', addUser)

router.get('/getUsers', (req, res)=>{
    UserModel.find()
    .then(users => res.json(users))
    .catch(err =>res.json(err))
})

module.exports = router;
