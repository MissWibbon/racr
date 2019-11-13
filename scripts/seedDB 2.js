const mongoose = require("mongoose");
const db = require("../models");

// This file empties the collections and inserts the books below

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/RacrDB"
);

// Seed user data
const userSeed = [
    {
        firstName: "Usain",
        lastName: "Bolt",
        username: "usain",
        email: "usainbolt@test.test",
        password: "test1234",
        city: "Chicago",
        state: "Illinois",
        country: "USA",
        age: 33,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Bolt_se_aposenta_com_medalha_de_ouro_no_4_x_100_metros_1039118-19.08.2016_frz-9565_%28cropped%29.jpg/470px-Bolt_se_aposenta_com_medalha_de_ouro_no_4_x_100_metros_1039118-19.08.2016_frz-9565_%28cropped%29.jpg",
        raceType: "sprint"
    },
    {
        firstName: "Tyreek",
        lastName: "Hill",
        username: "tyreek",
        email: "tyreekhill@test.test",
        password: "test1234",
        city: "Chicago",
        state: "Illinois",
        country: "USA",
        age: 25,
        image: "https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-s3.si.com%2Fs3fs-public%2Fstyles%2Fmarquee_large_2x%2Fpublic%2F2019%2F09%2F06%2Ftyreek-hill-extension-chiefs.jpg",
        raceType: "sprint"
    }
];

db.User
    .remove({})
    .then(() => db.User.collection.insertMany(userSeed))
    .then(data => {
        console.log(data.result.n + " users inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });


// Seed race data
const raceSeed = [
    {
        requestor: "usain",
        acceptor: "tyreek",
        open: false,
        distance: 200,
        winner: "usain",
        reason: "Who is faster?",
        requestorTime: 19.19,
        acceptorTime: 20.14
    }
];

db.Race
    .remove({})
    .then(() => db.Race.collection.insertMany(raceSeed))
    .then(data => {
        console.log(data.result.n + " races inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });