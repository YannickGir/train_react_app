const { image } = require("../models/Images");
const client = require("../database/connection");
const ImageModel = require("../models/Images");
const UserModel = require("../models/Users");
const sharedData = require("./sharedData");

const addImage = async (req, res) => {
  try {
    const email = sharedData.getSharedEmail();
    console.log("email: " + email);
    const images = req.body.images;
    const currentUser = await UserModel.findOne({ email: email });
    console.log("currentUser :" + currentUser);
    const userId = currentUser._id;
    for (const img of images) {
      let image = await ImageModel.findOne({ name: img.name, user_id: userId });
      if (image) {
        console.log(`L'image ${img.name} existe dans la collection.`);
        res.status(409).json({
          error:
            "Cette image est déjà présente. Veuillez en choisir une autre.",
        });
        return;
      }
    }

    for (const img of images) {
      console.log("userId stocké  !");
      const value = [img.name, userId];
      console.log("value créée  !");
      const createImage = async () => {
        await ImageModel.create({
          name: value[0],
          user_id: value[1],
        });
      };
      console.log("image créée  !");
      createImage();
    }

    res.json({ message: "L'image a été ajoutée avec succès !" });
    console.log("image ajoutée à la BDD ! ");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server Error" });
  }
};

const getImages = async (req, res) => {
  try {
    const email = sharedData.getSharedEmail();
    console.log("email: " + email);
    const currentUser = await UserModel.findOne({ email: email });
    console.log("currentUser :" + currentUser);
    const userId = currentUser._id;
    let images = await ImageModel.find({ user_id: userId });
    if (images.length > 0) {
      console.log(image);
      res.status(200).json({images});
      return;
    } else {
      res.status(409).json({
        error: "Aucune image trouvée.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server Error" });
  }
};

module.exports = { addImage, getImages };
