define("Vector", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Vector {
        constructor(x, y, z) {
            this.x = x * 1.0;
            this.y = y * 1.0;
            this.z = z * 1.0;
        }
        length() {
            return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
        }
        squaredLength() {
            return (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
        }
        makeUnitVector() {
            const k = 1.0 / this.length();
            this.x *= k;
            this.y *= k;
            this.z *= k;
        }
        add(v) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            return this;
        }
        subtract(v) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            return this;
        }
        multiply(arg) {
            if (arg instanceof Vector) {
                this.x *= arg.x;
                this.y *= arg.y;
                this.z *= arg.z;
                return this;
            }
            this.x *= arg;
            this.y *= arg;
            this.z *= arg;
            return this;
        }
        divide(arg) {
            if (arg instanceof Vector) {
                this.x /= arg.x;
                this.y /= arg.y;
                this.z /= arg.z;
                return this;
            }
            const k = 1.0 / arg;
            this.x *= k;
            this.y *= k;
            this.z *= k;
            return this;
        }
        static add(v1, v2) {
            return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
        }
        static subtract(v1, v2) {
            return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
        }
        static multiply(arg1, arg2) {
            if (arg1 instanceof Vector && arg2 instanceof Vector) {
                return new Vector(arg1.x * arg2.x, arg1.y * arg2.y, arg1.z * arg2.z);
            }
            if (arg1 instanceof Vector) {
                return new Vector(arg1.x * arg2, arg1.y * arg2, arg1.z * arg2);
            }
            if (arg2 instanceof Vector) {
                return new Vector(arg2.x * arg1, arg2.y * arg1, arg2.z * arg1);
            }
            throw new Error('At least one argument must be a Vector');
        }
        static divide(v1, arg2) {
            if (arg2 instanceof Vector) {
                return new Vector(v1.x / arg2.x, v1.y / arg2.y, v1.z / arg2.z);
            }
            return new Vector(v1.x / arg2, v1.y / arg2, v1.z / arg2);
        }
        static dot(v1, v2) {
            // return new Vector(v1.x * v2.x + v1.y * v2.y + v1.z * v2.z);
            return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
        }
        static cross(v1, v2) {
            return new Vector((v1.y * v2.z) - (v1.z * v2.y), -((v1.x * v2.z) - (v1.z * v2.x)), (v1.x * v2.y) - (v1.y * v2.x));
        }
        static unitVector(v) {
            const l = v.length();
            return new Vector(v.x / l, v.y / l, v.z / l);
        }
    }
    exports.default = Vector;
});
define("Ray", ["require", "exports", "Vector"], function (require, exports, Vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Ray {
        constructor(vecA, vecB) {
            this.a = vecA;
            this.b = vecB;
        }
        origin() {
            return this.a;
        }
        direction() {
            return this.b;
        }
        pointAtParameter(t) {
            return Vector_1.default.add(this.a, Vector_1.default.multiply(t, this.b));
        }
    }
    exports.default = Ray;
});
define("CanvasPainter", ["require", "exports", "Vector", "Ray"], function (require, exports, Vector_2, Ray_1) {
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
            let t = CanvasPainter.hitSphere(new Vector_2.default(0, 0, -1), 0.5, ray);
            if (t > 0.0) {
                const N = Vector_2.default.unitVector(Vector_2.default.subtract(ray.pointAtParameter(t), new Vector_2.default(0, 0, -1)));
                return Vector_2.default.multiply(0.5, new Vector_2.default(N.x + 0.9, N.y + 0.7, N.z + 0.0));
            }
            const unitDirection = Vector_2.default.unitVector(ray.direction());
            t = 0.5 * (unitDirection.y + 1.0);
            return Vector_2.default.add(Vector_2.default.multiply((1.0 - t), new Vector_2.default(1.0, 1.0, 1.0)), Vector_2.default.multiply(t, new Vector_2.default(0.5, 0.7, 1.0)));
        }
        /*
        * center: Vector
        * radius: Float
        * ray: Ray*/
        static hitSphere(center, radius, ray) {
            const oc = Vector_2.default.subtract(ray.origin(), center);
            const a = Vector_2.default.dot(ray.direction(), ray.direction());
            const b = 2.0 * Vector_2.default.dot(oc, ray.direction());
            const c = Vector_2.default.dot(oc, oc) - radius * radius;
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
            const lowerLeftCorner = new Vector_2.default(-2.0, -1.0, -1.0);
            const horizontal = new Vector_2.default(4.0, 0.0, 0.0);
            const vertical = new Vector_2.default(0.0, 2.0, 0.0);
            const origin = new Vector_2.default(0.0, 0.0, 0.0);
            for (let j = this.canvas.height - 1; j >= 0; j--) {
                for (let i = 0; i < this.canvas.width; i++) {
                    const a = '0xFF'; // maintain the value of the a pixel in rgba value at 255
                    const u = i / this.canvas.width;
                    const v = j / this.canvas.height;
                    const direction = Vector_2.default.add(Vector_2.default.multiply(u, horizontal), Vector_2.default.multiply(v, vertical));
                    const ray = new Ray_1.default(origin, Vector_2.default.add(lowerLeftCorner, direction));
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
define("main", ["require", "exports", "CanvasPainter"], function (require, exports, CanvasPainter_1) {
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
//# sourceMappingURL=bundle.js.map