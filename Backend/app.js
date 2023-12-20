const express = require('express')
const app = express()
const user_routes = require('./routes/user_routes')
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
mongoose.connect('')
app.use(user_routes)