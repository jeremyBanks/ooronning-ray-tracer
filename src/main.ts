import CanvasPainter from './CanvasPainter';

const generateImage = (canvas: HTMLCanvasElement) => {
  const img = new Image();
  img.src = canvas.toDataURL('image/png');
  document.getElementById('target')!.appendChild(img);
};

const main = () => {
  const canvas = document.createElement('canvas');
  const painter = new CanvasPainter(canvas, 400, 200);

  painter.render();
  generateImage(canvas);
};

main();
