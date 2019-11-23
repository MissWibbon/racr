const express = require('express')

const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const routes = require("./routes");
const app = express();


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
// var SOCKET_SERVER = process.env.SOCKET_SERVER || 'http://localhost:5000'

var server = require('http').createServer(app)

var io = require('socket.io').listen(server);
// var server = app.listen(PORT);
 server.listen(PORT);

io.on('connection', function (socket) {
   console.log('connect')




   socket.on('online', function (data) {
     
      console.log('online', data._id)

      socket.join('public').emit('welcome')
      
      socket.join(`${data._id}`).emit('event',{msg: 'things happened'})
   });

   socket.on('challenge', (data) => {

      console.log('being challenged' , data.acceptor , data.requestor)
      socket.to(data.acceptor).emit('challengeresponse', data);
      const challengeUsers = `${data.requestor}-${data.acceptor}`
      socket.join(challengeUsers)


   })

   socket.on('accepted', data => {
      const combatants = `${data.requestor}-${data.acceptor}`
      socket.join(combatants)
      console.log(data)
      const date = Date.now() + 5000
   //   socket.to(combatants).emit('startracenow' , date)
   socket.to(data.requestor).emit('startracenow' , { ...data , date})
   socket.to(data.acceptor).emit('startracenow' , { ...data , date})
   })
   
   // socket.on('status', post => {
   //    socket.to().emit(post)
   //    console.log(post)
   // })
   socket.on('startrace', data => {
      socket.to(`${data.requestor}-${data.acceptor}`).emit('start', { data: 'race started' })
      console.log(data);
   })
});


io.on('disconnect', function () { });
