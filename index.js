'use strict';

// class CanvasRenderer {
//   constructor(canvas) {
//     this.canvas = canvas;
//     this.canvas.width = 200;
//     this.canvas.height = 100;
//     this.context = this.canvas.getContext('2d');
//   }
//
//   generateGradientImage() {
//     for (let j = this.canvas.height - 1; j >= 0; j--) {
//       for (let i = 0; i < this.canvas.width; i++) {
//         const r = i / this.canvas.width;
//         const g = j / this.canvas.height;
//         const b = 0.2;
//
//         const ir = 255.99 * r;
//         const ig = 255.99 * g;
//         const ib = 255.99 * b;
//       }
//     }
//   }
//   render() {
//
//   }
// }
const main = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 100;
  const context = canvas.getContext('2d');
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  const img = new Image();

  for (let j = canvas.height; j >= 0; j--) {
    for (let i = 0; i < canvas.width; i++) {

      const offset = (j * canvas.width + i) * 4;
      const r = i / canvas.width;
      const g = j / canvas.height;
      const b = 0.2;
      const a = '0xFF';

      const ir = 255.99 * r;
      const ig = 255.99 * g;
      const ib = 255.99 * b;
      const ia = a;

      imageData.data[offset + 0] = ir;
      imageData.data[offset + 1] = ig;
      imageData.data[offset + 2] = ib;
      imageData.data[offset + 3] = ia;
    }
  }

  console.log(imageData)

  context.putImageData(imageData, 0, 0);
  document.getElementById('target').appendChild(canvas);

  img.src = canvas.toDataURL("image/png");
  document.getElementById('target').appendChild(img);
};

main();