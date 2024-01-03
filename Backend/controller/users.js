const {User} = require("../models/Users")
const client = require('../database/connection');
const UserModel = require("../models/Users");

const addUser = async (req, res) =>{
    
    try {
        const values = 
            [
                req.body.name,
                req.body.email,
            ]
        const newUser = await UserModel.create({
            name: values[0],
            email: values[1],
        })
        res.status(200).json({ message: "L'utilisateur a été créé avec succès !" });
        
        console.log('création utilisateur');
    } catch (error) {
        console.log((error));
        res.status(500).json({error:'internal server Error'});
    }
}

module.exports = {addUser};