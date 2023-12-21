const express = require('express')
const app = express()
const user_routes = require('./routes/user_routes')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

require('dotenv').config();

app.use(cors())
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASS}@cluster1.qzxbj9m.mongodb.net/test_react`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => console.log('Connexion à MongoDB réussie !'));




app.use(user_routes)