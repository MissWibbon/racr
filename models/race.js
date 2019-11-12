const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const raceSchema = new Schema({
    requestor: String,
    acceptor: String,
    open: Boolean,
    distance: { type: Number, default: 0 },
    winner: { type: String, default: "" },
    reason: { type: String, default: "For the lolz"},
    requestorTime: { type: Number, default: 0 },
    acceptorTime: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
});
const Race = mongoose.model("Race", raceSchema);
module.exports = Race;