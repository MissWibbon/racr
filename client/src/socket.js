import io from 'socket.io-client';
const socketURL = process.env.SOCKET_SERVER || 'http://localhost:5000' 

export const socket = io(socketURL);
//'https://mernracr.herokuapp.com'
