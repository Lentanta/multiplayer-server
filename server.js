const Websocket = require('ws');
const express = require('express');

const Player = require('./classes/Player.js');

const wss = new Websocket.Server({ port: 1337 });
const app = express();

let players = [];

wss.on('connection', ws => {
  console.log('New player have connect!')

  ws.on('message', (data) => {
    const msg = JSON.parse(data);
    switch (msg.type) {
      case 'CONNECT': {
        players.push({
          id: msg.id,
          x: Math.random() * 700,
          y: 700,
          ws
        });

        const message = JSON.stringify({
          type: 'CREATE_NEW_PLAYER', players
        })

        players.forEach((player) => {
          player.ws.send(message);
        })
        break;
      }

      case 'UPDATE_POSITION': {
        const index = players.findIndex((player) => player.id === msg.id)
        players[index].y -= 10; 
        const message = JSON.stringify({
          type: 'UPDATE_POSITION', players
        })
        players.forEach((player) => {
          player.ws.send(message);
        })
      }

      default: {
        console.log("Default: ", msg);
      }
    }
  })

  ws.on('close', () => {
    players.forEach((player, index) =>{
      if(player.ws === ws){
        players.splice(index, 1)
      }
    })
  })
})

// setInterval(() =>{
//   console.log(players.length);
// }, 1000)

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.listen(8000, () => {
  console.log('Listen at port 8000');
  console.log('Websockt at port 1337');
})