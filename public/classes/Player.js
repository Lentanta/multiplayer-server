import { Timer } from "./Timer.js";

export class Player {
  constructor(id) {
    this.id = id;
    this.moveTimer = new Timer();
  }

  draw(player) {
    ctx.beginPath();
    ctx.arc(player.x, player.y, 30, 0, Math.PI * 2, false);
    ctx.fillStyle = 'blue'
    ctx.fill();
  }

  update(player, players) {
    this.draw(player);
    this.move(players);
  }

  move(players) {
    if (game.controller['w'].pressed) {
      socket.emit('playerMove', { id: this.id, move: 'up' })
      // players[this.id].y -= 3
    }
    if (game.controller['s'].pressed) {
      socket.emit('playerMove', { id: this.id, move: 'down' })
      // players[this.id].y += 3
    }
    if (game.controller['a'].pressed) {
      socket.emit('playerMove', { id: this.id, move: 'left' })
      // players[this.id].x -= 3
    }
    if (game.controller['d'].pressed) {
      socket.emit('playerMove', { id: this.id, move: 'right' })
      // players[this.id].x += 3
    }
  }
}