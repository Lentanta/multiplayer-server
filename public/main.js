import { Game } from './classes/Game.js';

window.canvas = document.getElementById('canvas-game');
window.ctx = canvas.getContext('2d');
window.ws = new WebSocket('ws://localhost:1337');

canvas.width = 700;
canvas.height = 700;
window.game = new Game();

game.eventListen();
let players = [];
const id = Math.floor((Math.random() * 100) + 1) 

ws.addEventListener('open', () => {
  const msg = JSON.stringify({ type: 'CONNECT', id})
  console.log(id)
  ws.send(msg)
})

ws.addEventListener('message', ({ data }) => {
  const msg = JSON.parse(data)

  switch(msg.type){
    case 'CREATE_NEW_PLAYER':{
      players = msg.players
      break;
    }
    case 'UPDATE_PLAYER': {
      players = msg.players
      break;
    }
    case 'UPDATE_POSITION': {
      players = msg.players
      break;
    }
    default:{}
  }
})

ws.addEventListener('onclose', () => {
  const msg = JSON.stringify({ type: 'DISCONNECT' })
  ws.send(msg)
})

addEventListener('click', () =>{
  const msg = JSON.stringify({ type: 'UPDATE_POSITION', id })
  const index = players.findIndex((player) => player.id === id); 
  players[index].y -= 10; 
  ws.send(msg)
})


const run = () => {
  let now = performance.now();
  let dt = (now - game.lastTime) / 1000;
  game.lastTime = now;
  game.animationFrame = requestAnimationFrame(run);
  //===== RUN PART ====//
  game.clearScreen();
  // console.log(players)
  players.forEach((player) => {
    ctx.beginPath();
    ctx.arc(player.x, player.y, 30, 0, Math.PI * 2, false);
    player.id === id?   ctx.fillStyle = 'red' : ctx.fillStyle = 'blue'
    ctx.fill();
  });


}

run();