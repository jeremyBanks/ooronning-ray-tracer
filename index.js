'use strict';

const radians = degrees => (Math.PI/180) * degrees;
const degrees = radians => (180/Math.PI) * radians;

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

  drawCenterBox() {
    this.context.clearRect(180, 180, 140, 140);
    this.context.strokeRect(190, 190, 120, 120);
  }

  drawCircle(centerPoint) {
    const { x, y } = centerPoint;

    this.context.beginPath();
    this.context.arc(x, y, 60, 0, Math.PI * 2);
    this.context.stroke();
  }

  drawCenterTriangle() {
    this.context.fillStyle = 'navy';
    this.context.beginPath();
    this.context.moveTo(250, 200);
    this.context.lineTo(200 ,300);
    this.context.lineTo(300, 300);

    // fill call assumes a line is drawn to the start point
    // stroke call (which draws an outline) does not do this
    this.context.fill();
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

    this.drawCenterBox();
    this.drawCenterTriangle();
    this.drawCircle({ x: 250, y: 250 });
  }
}

const main = () => {
  const writer = new CanvasWriter(document.createElement('canvas'));
  writer.render();
};

main();
