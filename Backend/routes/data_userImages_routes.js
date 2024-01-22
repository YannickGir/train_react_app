const express = require('express');
const { addImage } = require('../controller/images');
const router = express.Router()


router.post('/sendImage', addImage)

module.exports = router;