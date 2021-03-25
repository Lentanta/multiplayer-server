const Websocket = require('ws');
const Player = require('./classes/Player.js');

const wss = new Websocket.Server({
  port: 1337
})

let players = [];


wss.on('connection', ws => {
  console.log('New player have connect!')
  ws.on('message', (data) => {
    const msg = JSON.parse(data);

    switch (msg.type) {
      case 'CONNECT': {
        players.push(new Player(
          msg.id,
          players.length - 1,
          ws, 0, 0));
        // Send to all 
        players.forEach((player) => {
          if (player.ws !== ws) { ws.send('Player #' + msg.id) }
          if (player.ws === ws) { ws.send('Welcome to the Game') }
        });
        console.log("ARR: ", players)
      }

      case 'UPDATE': {

      }

      default: {
        console.log("Default: ", msg)
      }
    }
  })

  ws.on('close', () => {
    console.log('Disconnect')
  })
})