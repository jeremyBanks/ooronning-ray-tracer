define(["require", "exports", "./Vector", "./Ray"], function (require, exports, Vector_1, Ray_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CanvasPainter {
        constructor(canvas, width, height) {
            this.canvas = canvas;
            this.canvas.width = width ? width : 500;
            this.canvas.height = height ? height : 500;
            this.context = this.canvas.getContext('2d');
        }
        static color(ray) {
            let t = CanvasPainter.hitSphere(new Vector_1.default(0, 0, -1), 0.5, ray);
            if (t > 0.0) {
                const N = Vector_1.default.unitVector(Vector_1.default.subtract(ray.pointAtParameter(t), new Vector_1.default(0, 0, -1)));
                return Vector_1.default.multiply(0.5, new Vector_1.default(N.x + 0.9, N.y + 0.7, N.z + 0.0));
            }
            const unitDirection = Vector_1.default.unitVector(ray.direction());
            t = 0.5 * (unitDirection.y + 1.0);
            return Vector_1.default.add(Vector_1.default.multiply((1.0 - t), new Vector_1.default(1.0, 1.0, 1.0)), Vector_1.default.multiply(t, new Vector_1.default(0.5, 0.7, 1.0)));
        }
        /*
        * center: Vector
        * radius: Float
        * ray: Ray*/
        static hitSphere(center, radius, ray) {
            const oc = Vector_1.default.subtract(ray.origin(), center);
            const a = Vector_1.default.dot(ray.direction(), ray.direction());
            const b = 2.0 * Vector_1.default.dot(oc, ray.direction());
            const c = Vector_1.default.dot(oc, oc) - radius * radius;
            const discriminant = b * b - 4 * a * c;
            if (discriminant < 0) {
                return -1.0;
            }
            else {
                return (-b - Math.sqrt(discriminant)) / (2.0 * a);
            }
        }
        render() {
            // allows us to interface with CanvasPainter's internal canvas property
            const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            let arrayOffset = 0;
            const lowerLeftCorner = new Vector_1.default(-2.0, -1.0, -1.0);
            const horizontal = new Vector_1.default(4.0, 0.0, 0.0);
            const vertical = new Vector_1.default(0.0, 2.0, 0.0);
            const origin = new Vector_1.default(0.0, 0.0, 0.0);
            for (let j = this.canvas.height - 1; j >= 0; j--) {
                for (let i = 0; i < this.canvas.width; i++) {
                    const a = '0xFF'; // maintain the value of the a pixel in rgba value at 255
                    const u = i / this.canvas.width;
                    const v = j / this.canvas.height;
                    const direction = Vector_1.default.add(Vector_1.default.multiply(u, horizontal), Vector_1.default.multiply(v, vertical));
                    const ray = new Ray_1.default(origin, Vector_1.default.add(lowerLeftCorner, direction));
                    const col = CanvasPainter.color(ray);
                    const ir = 255.99 * col.x;
                    const ig = 255.99 * col.y;
                    const ib = 255.99 * col.z;
                    const ia = a;
                    imageData.data[arrayOffset] = ir;
                    imageData.data[arrayOffset + 1] = ig;
                    imageData.data[arrayOffset + 2] = ib;
                    imageData.data[arrayOffset + 3] = ia;
                    arrayOffset += 4;
                }
            }
            this.context.putImageData(imageData, 0, 0);
            document.getElementById('target').appendChild(this.canvas);
        }
    }
    exports.default = CanvasPainter;
});
//# sourceMappingURL=CanvasPainter.js.map