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
    age: Number,
    image: String,
    raceType: String,
<<<<<<< HEAD
=======
    friends: [Schema.Types.ObjectId],
>>>>>>> 7c43ded95dc23f833c5ee41f50e8298146be180a
    date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
