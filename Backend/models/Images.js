const mongoose = require('mongoose');

const imageShema = new mongoose.Schema([{
    name: String,
    path:String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    file: String,
}])

const ImageModel = mongoose.model('images', imageShema)

module.exports = ImageModel