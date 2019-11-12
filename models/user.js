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
    friends: [Schema.Types.ObjectId],
    date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
