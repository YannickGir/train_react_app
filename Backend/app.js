const express = require('express')
const app = express()
const user_routes = require('./routes/user_routes')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

require('dotenv').config();

app.use(cors())
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASS}@cluster0.rhyjx.mongodb.net/?retryWrites=true&w=majority`)

app.get('/getUsers', (req, res)=>{
    UserModel.find()
    .then(users => res.json(users))
    .catch(err =>res.json(err))
})

app.use(user_routes)