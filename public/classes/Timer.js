export class Timer {
  constructor() {
    this.lastTime = 0;
  }
  delay(delayTime, callback) {
    const now = performance.now();
    if ((now - this.lastTime) > delayTime) {
      callback();
      this.lastTime = now;
    }
  }
}