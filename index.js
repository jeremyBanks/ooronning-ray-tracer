'use strict';

class CanvasWriter {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.context = this.canvas.getContext('2d');
  }

  /*
  * color: string, may be a rgba value
  * startPosition: x(int), y(int)*/
  drawBox(color, startPosition) {
    const { x, y } = startPosition;

    this.context.fillStyle = color;
    this.context.fillRect(x, y, 200, 200);
  }

  render() {
    document.getElementById('target').appendChild(this.canvas);
    for (let pos = 10; pos < 300; pos += 20) {
      this.drawBox('rgba(0, 200, 0, 0.5)', { x: pos, y: pos });
    }
    for (let x = 290, y = 10; x > 0; x -= 20, y += 20) {
      this.drawBox('rgba(0, 0, 200, 0.2)', { x, y });
    }
    for (let y = 10; y < 300; y += 20) {
      this.drawBox('rgba(200, 0, 0, 0.2)', { x: 150, y })
    }
  }
}

const main = () => {
  const writer = new CanvasWriter(document.createElement('canvas'));
  writer.render();
};

main();
