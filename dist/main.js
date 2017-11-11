define(["require", "exports", "./CanvasPainter"], function (require, exports, CanvasPainter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const generateImage = canvas => {
        const img = new Image();
        img.src = canvas.toDataURL('image/png');
        document.getElementById('target').appendChild(img);
    };
    const main = () => {
        const canvas = document.createElement('canvas');
        const painter = new CanvasPainter_1.default(canvas, 400, 200);
        painter.render();
        generateImage(canvas);
    };
    main();
});
//# sourceMappingURL=main.js.map