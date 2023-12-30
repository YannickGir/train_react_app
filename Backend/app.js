const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
const connectToDatabase = require('./database/connection')
const userRoute = require('./routes/user_routes')
const { error } = require('console')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/api/v1', userRoute)

connectToDatabase(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASS}@cluster1.qzxbj9m.mongodb.net/?retryWrites=true&w=majority/test_react`, (error)=> {
    if(error) {
        console.log('error connexion to databse');
        process.exit(-1);
    } else {
        console.log('connexion to database success');
        app.listen(3001);

console.log('waiting to request to port 3000');    
}
})

//Call the function to connect to the database
// connectToDatabase();


// require('dotenv').config();

// app.use(cors())
// mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASS}@cluster1.qzxbj9m.mongodb.net//?retryWrites=true&w=majority/test_react`, { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
// db.once('open', () => console.log('Connexion à MongoDB réussie !'));




// app.use(user_routes)