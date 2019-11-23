import io from 'socket.io-client';
const socketURL = 'https://mernracr.herokuapp.com' || 'http://localhost:5000' 

export const socket = io(socketURL);
//'https://mernracr.herokuapp.com'
