const {MongoClient} = require('mongodb')

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
    
    function bd(){
        return new Db(client, 'dbOk')
    }
    
    function closeConnection () {
    if (client) {
        client.close();
        client = null;
    }
    }
    
    module.exports=(connectToDatabase, bd, closeConnection)
    