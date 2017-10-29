'use strict';

class CanvasPainter {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.canvas.width = width ? width : 500;
    this.canvas.height = height ? height : 500;
    this.context = this.canvas.getContext('2d');
  }
  
  render() {
    const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    let offset = 0;

    for (let j = this.canvas.height - 1; j >= 0; j--) {
      for (let i = 0; i < this.canvas.width; i++) {

        const r = i / this.canvas.width;
        const g = j / this.canvas.height;
        const b = 0.2;
        const a = '0xFF'; // 255

        const ir = 255.99 * r;
        const ig = 255.99 * g;
        const ib = 255.99 * b;
        const ia = a;

        imageData.data[offset] = ir;
        imageData.data[offset + 1] = ig;
        imageData.data[offset + 2] = ib;
        imageData.data[offset + 3] = ia;

        offset += 4;
      }
    }

    this.context.putImageData(imageData, 0, 0);
    document.getElementById('target').appendChild(this.canvas);
  }
}

const generateImage = canvas => {
  const img = new Image();
  img.src = canvas.toDataURL('image/png');
  document.getElementById('target').appendChild(img);
};

const main = () => {
  const canvas = document.createElement('canvas');
  const painter = new CanvasPainter(canvas, 200, 100);

  painter.render();
  generateImage(canvas);
};

main();
