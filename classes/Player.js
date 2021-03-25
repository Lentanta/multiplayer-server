module.exports = class Player {
  constructor(id, index, ws, x, y) {
    this.id = id;
    this.ws = ws;
    this.index = index;
    // Coordinate X,Y
    this.x = x;
    this.y = y;
  }
}