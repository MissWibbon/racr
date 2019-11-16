const express= require('express')

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

var server = app.listen(PORT);

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
   let online = false;
   console.log('connect')
   let interval;
   
   if (online === false){
      
      interval = setInterval(()=>{
         socket.emit('ask')
      },1000)
   }

   socket.on('online', function(data){
      online = true; 
      clearInterval(interval)
      console.log('hit')
      
      socket.join('public').emit('welcome')
      
      socket.join(`${data._id}`).emit('event',{msg: 'shit happened'})
   });

   socket.on('challenge',(data) =>{
      console.log('being challenged')
      socket.to(data.acceptor).emit('challenge',{data})
   })
});


io.on('disconnect', function(){});
