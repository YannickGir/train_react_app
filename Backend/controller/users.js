const {User} = require("../models/Users")
const client = require('../database/connection');
const UserModel = require("../models/Users");

const addUser = async (req, res) =>{
    
    try {
        db.users.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
              console.error('Erreur lors de la recherche de l\'e-mail :', err);
            }
          
            if (user) {
              console.log(`L'e-mail ${req.body.email} existe dans la collection.`);
              // Faire quelque chose si l'e-mail existe
            } else {
              console.log(`L'e-mail ${emailToCheck} n'existe pas dans la collection.`);
              // Faire quelque chose si l'e-mail n'existe pas
            }
          });
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