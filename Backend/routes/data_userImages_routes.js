const express = require('express');
const { addImage, getImages, deleteImage } = require('../controller/images');
const router = express.Router()


router.post('/sendImage', addImage)
router.get('/getImages', getImages)
router.post('/deleteImage', deleteImage)

module.exports = router;