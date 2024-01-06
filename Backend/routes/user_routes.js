
const express = require('express')
const router = express.Router()
const {addUser, logUser} = require('../controller/users')


router.post('/signUp', addUser)
router.post('/signIn', logUser)
// router.get('/getUsers', (req, res)=>{
//     UserModel.find()
//     .then(users => res.json(users))
//     .catch(err =>res.json(err))
// })

module.exports = router;
