const mongoose = require('mongoose');

const avatarShema = new mongoose.Schema([{
    name: String,
    path:String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    file: String,
}])

const AvatarModel = mongoose.model('avatar', avatarShema)

module.exports = AvatarModel