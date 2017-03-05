const express = require ('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


app.use(express.static('client'))
app.get('/hola-mundo', (req, res) => {
  res.status(200).send('Hola Munda')
});

const messages = [
  {
    id:1,
    text: 'Bienvenido al chat',
    nickname: 'tipiwiny'
  }
]
io.on('connection' , (socket) => {
  console.log('El cliente con IP' + socket.handshake.address +" se ha conectado ..."
);
socket.emit('messages', messages)
socket.on('add-message', (data) => {
  messages.push(data);
  io.sockets.emit('messages', messages)
})
})

server.listen(8080,() => {
  console.log('Servidor esta funcioando')
});
