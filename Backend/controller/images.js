const { image } = require("../models/Images");
const client = require("../database/connection");
const ImageModel = require("../models/Images");
const UserModel = require("../models/Users");
const sharedData = require('./sharedData');

const addImage = async (req, res) => {
  try {
    const email = sharedData.getSharedEmail();
    console.log('email: ' + email);
    const images = req.body.images;
    const currentUser = await UserModel.findOne({ email: email });
    console.log("currentUser :" + currentUser);
    const userId = currentUser._id;
    let image = ''
    for (const img of images) {
     image = await ImageModel.findOne({ name: img.name, user_id: userId });
     if (image) {
        console.log(`L'image ${img.name} existe dans la collection.`);
        res.status(409).json({
            error: "Cette image est déjà présente. Veuillez en choisir une autre.",
        });
    } else {
        // const currentUser = await UserModel.findOne({ email: email });
        
            if (currentUser) {
                
                
                console.log('userId stocké  !');
                const value = [img.name,userId];
                console.log('value créée  !');
                const createImage = async () => {
                    await ImageModel.create({
                    name: value[0],
                    user_id:value[1]
                    });
                };
                console.log('image créée  !');
                createImage();
                
                res.json({ message: "L'image a été ajoutée avec succès !" });
                console.log("image ajoutée à la BDD ! ");
           
            } else {
            console.log(
            `L'e-mail ${req.body.email} n'existe pas dans la collection.`
            );
      }
      
    }
    }
    
   
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server Error" });
  }
};

module.exports = { addImage };
