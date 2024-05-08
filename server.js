const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

var acessos = 0;
var acessados = 0;

var fs = require('fs');

let usuarios = [
    {
        "name": "Gustavo Molina",
        "user": "MolinaGu_",
        "password": "123456",
        "type": "professor",
        "status": false
    },
    {
        "name": "Lorena Pessoa",
        "user": "Lolo",
        "password": "123456",
        "type": "aluno",
        "status": false
    },
];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Um cliente se conectou: ' + socket.id);
    acessados++;
    acessos++;
    console.log("Acessados agora: " + acessados);
    console.log("Acessos totais: " + acessos);

    fs.readFile('image.png', (err, buf) => {
        if (err) throw err;
        socket.emit('image', { image: true, buffer: buf.toString('base64') });
    });

socket.on('disconnect', () => {
    console.log('Um cliente se desconectou: ' + socket.id);
    acessados--;
    console.log(acessados);
    console.log(acessos);
    });
});
io.engine.on("connection_error", (err) => {
    console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
  });

let port = 3000;
server.listen(port, () => {
    console.log('Servidor Socket.io rodando na porta: '+port);
});