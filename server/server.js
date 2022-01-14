require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketio = require('socket.io');
const { ExpressPeerServer } = require('peer');
//
const SocketServer = require('./SocketServer');
//
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));

// Socket
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  SocketServer(socket);
});

// Create Peer server
ExpressPeerServer(server, { path: '/' });

// Routes
app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/postRouter'));
app.use('/api', require('./routes/commentRouter'));
app.use('/api', require('./routes/notifyRouter'));
app.use('/api', require('./routes/messageRouter'));

// Cloud Mongodb Atlas
require('./db');

// Listen server
const PORT = process.env.PORT || 8800;
server.listen(8800, () => {
  console.log(`Server running on port: ${PORT}`);
});
