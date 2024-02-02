const express = require('express');
const { addImage, getImages, deleteImage, addAvatar, getAvatar } = require('../controller/images');
const router = express.Router()


router.post('/sendImage', addImage)
router.get('/getImages', getImages)
router.post('/deleteImage', deleteImage)
router.post('/sendAvatar', addAvatar)
router.get('/getAvatar', getAvatar)



module.exports = router;