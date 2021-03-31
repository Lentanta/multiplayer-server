const express = require('express');
const http = require('http');

const app = express();
const httpServer = http.Server(app);
const io = require('socket.io')(httpServer)

let players = {};
let commands = [];

io.on('connection', (socket) => {

  socket.emit('welcome', 'welcome');
  socket.on('userConnect', ({ id, player }) => {
    players[id] = {
      socketId: socket.id,
      x: (Math.random() * 700) + 1,
      y: 700,
    };
  });

  socket.on('disconnect', () => {
    const list = Object.entries(players)
    for (let i = 0; i < list.length; i++) {
      if (list[i] && list[i][1].socketId === socket.id) {
        delete players[list[i][0]]
        break;
      }
    }
  });

  socket.on('playerMove', ({ id, move }) => {
    commands.push({ id, move })
  })

  setInterval(() => {
    // socket.broadcast.emit('updatePosition', players)
    commands.forEach((command, index) => {
      movePlayer(command)
      commands.splice(index, 1);
    });
  }, 15);

  setInterval(() =>{
    socket.broadcast.emit('updatePosition', players)
  }, 45)

});

app.use('/resources', express.static('resources'));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
})

httpServer.listen(8000, () => {
  console.log('Listen at port 8000');
})

// ========== //

const movePlayer = ({ id, move }) => {
  if (move === 'up') { players[id].y -= 3 }
  if (move === 'down') { players[id].y += 3 }
  if (move === 'left') { players[id].x -= 3 }
  if (move === 'right') { players[id].x += 3 }
}
