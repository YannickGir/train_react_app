const express = require('express')
const router = express.Router()


router.get('/getUsers', (req, res)=>{
    UserModel.find()
    .then(users => res.json(users))
    .catch(err =>res.json(err))
})

module.exports = router;
