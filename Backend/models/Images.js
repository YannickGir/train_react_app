const mongoose = require('mongoose');

const imageShema = new mongoose.Schema([{
    name: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
}])

const ImageModel = mongoose.model('images', imageShema)

module.exports = ImageModel