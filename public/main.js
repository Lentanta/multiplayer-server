import { Game } from './classes/Game.js'
import { Player } from './classes/Player.js';

window.canvas = document.getElementById('canvas-game');
window.ctx = canvas.getContext('2d');
window.socket = io();

canvas.width = 700;
canvas.height = 700;

window.game = new Game();
game.eventListen();

let players = {};
let player = new Player(Math.random().toString(36).substr(2, 9))


socket.on('connect', () => {
  console.log('Successfully connected!');
  socket.emit('userConnect', { id: player.id })
});

socket.on('updatePosition', (newPlayers) => {
  players = newPlayers;
})

const run = () => {
  let now = performance.now();
  let dt = (now - game.lastTime) / 1000;
  game.lastTime = now;
  game.animationFrame = requestAnimationFrame(run);
  //===== RUN PART ====//
  game.clearScreen();
 

  Object.entries(players).forEach(([key, value]) => {
    player.update(players[key], players);
  });
}

run();