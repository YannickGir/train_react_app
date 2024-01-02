const mongoose = require('mongoose');
require('dotenv').config();
const dbURL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASS}@cluster0.rhyjx.mongodb.net/test?retryWrites=true&w=majority`;

async function connectToDatabase() {
    try {
        if(mongoose.connection.readyState != 1) {
            await mongoose.connect(dbURL)
            console.log('connected !');
        }
        else {
            console.log('already connected !');
        }
       
    }catch(err) {
        console.log('not connected' , err);
        process.exit(1);
    }
    }
    
    module.exports = {
        connectToDatabase,
    };
    

    