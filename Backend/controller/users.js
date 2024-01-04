const {User} = require("../models/Users")
const client = require('../database/connection');
const UserModel = require("../models/Users");

const addUser = async (req, res) =>{
    
    try {
        const user = await UserModel.findOne({ email: req.body.email }) 
            if (user) {
              console.log(`L'e-mail ${req.body.email} existe dans la collection.`);
              res.status(409).json({ error: 'Cet email est déjà utilisé. Veuillez choisir un autre.' });

            } else {
              console.log(`L'e-mail ${req.body.email} n'existe pas dans la collection.`);
               const values = 
            [
                req.body.name,
                req.body.email,
            ]
            const createUser = async () => {
                await UserModel.create({
                name: values[0],
                email: values[1],
                })
            } 
            createUser()
            res.status(200).json({ message: "L'utilisateur a été créé avec succès !" });
        
            console.log('création utilisateur');
            
          };
       
    } catch (error) {
        console.log((error));
        res.status(500).json({error:'internal server Error'});
    }
}

module.exports = {addUser};