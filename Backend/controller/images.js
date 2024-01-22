const { image } = require("../models/Images");
const client = require("../database/connection");
const ImageModel = require("../models/Images");
const UserModel = require("../models/Users");

const addImage = async (req, res) => {
  try {
    const image = await ImageModel.findOne({ image: req.body.name });
    if (image) {
        console.log(`L'image ${req.body.name} existe dans la collection.`);
        res.status(409).json({
            error: "Cette image est déjà présente. Veuillez en choisir une autre.",
        });
    } else {
        const currentUser = await UserModel.findOne({ email: req.body.email });
        console.log("currentUser._id :" + currentUser._id);
            if (currentUser) {
                
                const userId = currentUser.id;
                console.log('userId stocké  !');
                const value = [req.body.name,userId];
                console.log('value créée  !');
                const createImage = async () => {
                    await ImageModel.create({
                    name: value[0],
                    user_id:value[1]
                    });
                };
                console.log('image créée  !');
                createImage();
                
                res.status(200).json({ message: "L'image a été ajoutée avec succès !" });
                console.log("image ajoutée à la BDD ! ");
           
            } else {
            console.log(
            `L'e-mail ${req.body.email} n'existe pas dans la collection.`
            );
      }
      
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server Error" });
  }
};

module.exports = { addImage };
