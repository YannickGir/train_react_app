const express = require('express')
const app = express()
const user_routes = require('./routes/user_routes')

app.use(user_routes)