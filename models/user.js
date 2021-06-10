const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    id: Number,
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
    city: String,
    state: String,
    country: { type: String, default: "USA" },
    dob: {type: Date},
    image: String,
    friends: [Schema.Types.ObjectId],
    onlineStatus: { type: Boolean, default: false }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
