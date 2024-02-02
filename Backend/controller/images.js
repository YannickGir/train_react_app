const { image } = require("../models/Images");
const client = require("../database/connection");
const ImageModel = require("../models/Images");
const AvatarModel = require('../models/Avatar');
const UserModel = require("../models/Users");
const sharedData = require("./sharedData");

const addAvatar = async (req, res) => {
    console.log('activation de la route addAvatar');
    if (!req.body.avatar) {
        return res.status(400).json({ error: 'Aucune donnée d\'avatar fournie.' });
    }
    console.log('req.body.avatar.name dans route addAvatar:', req.body.avatar.name);
    try {
        const email = sharedData.getSharedEmail();
        const avatarFromFront = req.body.avatar;
        const currentUser = await UserModel.findOne({ email: email });
        const userId = currentUser._id;

        let existingAvatar = await AvatarModel.findOne({user_id: userId });

        const avatarPath = 'uploadAvatar/' + avatarFromFront.name;
        if (existingAvatar.name == avatarFromFront.name) {
            console.log(`L'avatar ${avatarFromFront.name} existe dans la collection.`);
            res.status(409).json({
              error:
                "Cette image est déjà présente. Veuillez en choisir une autre.",
            });
            return;
          }
          if (existingAvatar.name != avatarFromFront.name) {
            existingAvatar.name = avatarFromFront.name;
            existingAvatar.path = avatarPath
            await existingAvatar.save();
          }
          if(!existingAvatar) {
            const value = [avatarFromFront.name, avatarPath, userId];
            await AvatarModel.create({
              name: value[0],
              path: value[1],
              user_id: value[2],
            });
          console.log("avatar créé  !");
        }
    
        res.json({ message: "L'image a été ajoutée avec succès !" });
        console.log("image ajoutée à la BDD ! ");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server Error" });
      }
}

const addImage = async (req, res) => {
  try {
    
    const email = sharedData.getSharedEmail();
    // console.log("email: " + email);
    const images = req.body.images;
    const currentUser = await UserModel.findOne({ email: email });
    // console.log("currentUser :" + currentUser);
    // console.log("currentUser._id :" + currentUser._id);
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
     const imagePath = 'uploads/' + img.name;
    //   console.log("userId stocké  !");
      const value = [img.name, imagePath, userId];
    //   console.log("value créée  !");
      const createImage = async () => {
        await ImageModel.create({
          name: value[0],
          path: value[1],
          user_id: value[2],
        });
      };
    //   console.log("image créée  !");
      createImage();
    }

    res.json({ message: "L'image a été ajoutée avec succès !" });
    // console.log("image ajoutée à la BDD ! ");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server Error" });
  }
};

const getAvatar = async (req, res) => {
    try {
      const email = sharedData.getSharedEmail();
      console.log("emailFromAvatar: " + email);
      const currentUser = await UserModel.findOne({ email: email });
      console.log("currentUserFromAvatar :" + currentUser);
      const userId = currentUser._id;
      console.log("currentUser._idFromAvatar :" + currentUser._id);
      let avatar = await AvatarModel.find({ user_id: userId });
      if (avatar) {
        console.log('avatar:' + avatar);
        res.status(200).json({avatar});
        return;
      } else {
        res.status(409).json({
          error: "Aucun avatar trouvé.",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server Error" });
    }
  };


const getImages = async (req, res) => {
  try {
    const email = sharedData.getSharedEmail();
    // console.log("email: " + email);
    const currentUser = await UserModel.findOne({ email: email });
    // console.log("currentUser :" + currentUser);
    const userId = currentUser._id;
    // console.log("currentUser._id :" + currentUser._id);
    let images = await ImageModel.find({ user_id: userId });
    if (images.length > 0) {
    //   console.log('images:' + images);
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

const deleteImage = async (req, res)=> {
    try {
        const email = sharedData.getSharedEmail();
        console.log("email: " + email);
        const currentUser = await UserModel.findOne({ email: email });
        const userId = currentUser._id;
        const imageToDelete = req.body.imageToDelete;
        console.log('image à supprimer coté server:' + imageToDelete.name);
        await ImageModel.findOneAndDelete({ user_id: userId, name:imageToDelete.name});
        res.status(200).json('image supprimée !');
    }catch(error) {
        console.log(error);
        res.status(500).json({ error: "internal server Error" });
    }
}

module.exports = { addImage, getImages, deleteImage, addAvatar, getAvatar };
