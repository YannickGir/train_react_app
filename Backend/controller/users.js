const {User} = require("../models/Users")
const client = require('../database/connection')

const addUser = async (req, res) =>{
    try {
        let user = new User({
            name: req.body.name,
            email:req.body.email,
            age :req.body.age,  
        }
         
        );
        let result = await client
        .db()
        .collection("users")
        .inserOne(user)

        res.status(200).json(result)

    } catch (error) {
        console.log((error));
        res.status(500).json({error:'internal server Error'});
    }
}

module.exports = {addUser};