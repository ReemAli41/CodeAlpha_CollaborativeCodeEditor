const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

let sharedCode = ''; // Shared code among users

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send the initial shared code to the new user
  socket.emit('init-code', sharedCode);

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('code-change', (data) => {
    sharedCode = data;
    socket.broadcast.emit('code-change', data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
