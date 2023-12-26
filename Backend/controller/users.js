const {user} = require("../models/Users")
const client = require('../database/connection')

const addUser = async (req, res) =>{
    try {
        let user = new User(
            req.body.name,
            req.body.email,
            req.body.age,
        );
        let result = await client
        .bd()
        .collection("users")
        .inserOne(user)

        res.status(200).json(result)

    } catch (error) {
        console.log((error));
        res.status(500).json(error);
    }
}