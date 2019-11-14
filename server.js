const express= require('express')

const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const routes = require("./routes");
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// const routes = require("./routes");
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
 }
 
// Define API routes
app.use(routes);
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/RacrDB";
mongoose.connect(MONGODB_URI)
.then(() => console.log('Mongo Db connected'))
.catch(err => console.log(err));
var PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`server connected to port ${PORT}`);
})

io.on('connection', function (socket) {
   socket.emit('news', { hello: 'world' });
   socket.on('my other event', function (data) {
     console.log(data);
   });
})
