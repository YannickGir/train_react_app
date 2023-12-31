const {MongoClient, Db} = require('mongodb')

var client = null;

function connectToDatabase(url, callback) {
    if (client ==null) {
    client = new MongoClient(url);
    
    client.connect((err)=>{
        if (err){
            client=null
            callback(err)
        } else { 
            callback()
        }
    })
    }else{
        callback()
    }
    }
    
    function getDb() {
        if (client) {
            return client.db('dbOk');
        } else {
            throw new Error('Not connected to the database');
        }
    }
    
    function closeConnection() {
        if (client) {
            client.close();
            client = null;
        }
    }
    
    module.exports = {
        connectToDatabase,
        getDb,
        closeConnection,
    };
    
    // module.exports=(connectToDatabase, getDb, closeConnection)
    