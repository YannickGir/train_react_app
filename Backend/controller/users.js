const {User} = require("../models/Users")
const client = require('../database/connection')

const addUser = async (req, res) =>{
    try {
        const newUser = await UserModel.create(req.body);

        res.status(201).send(newUser);

    } catch (error) {
        console.log((error));
        res.status(500).json({error:'internal server Error'});
    }
}

module.exports = {addUser};