const express = require('express');
const { addImage, getImages } = require('../controller/images');
const router = express.Router()


router.post('/sendImage', addImage)
router.get('/getImages', getImages)

module.exports = router;