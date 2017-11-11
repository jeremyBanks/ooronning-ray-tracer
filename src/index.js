'use strict';

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
    return new Vector(
      (v1.y * v2.z) - (v1.z * v2.y),
      -((v1.x * v2.z) - (v1.z * v2.x)),
      (v1.x * v2.y) - (v1.y * v2.x)
    );
  }

  static unitVector(v) {
    const l = v.length();
    return new Vector(v.x / l, v.y / l, v.z / l);
  }
}

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
    return Vector.add(this.a, Vector.multiply(t, this.b));
  }
}

class CanvasPainter {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.canvas.width = width ? width : 500;
    this.canvas.height = height ? height : 500;
    this.context = this.canvas.getContext('2d');
  }

  static color(ray) {
    let t = CanvasPainter.hitSphere(new Vector(0, 0, -1), 0.5, ray);
    if (t > 0.0) {
      const N = Vector.unitVector(Vector.subtract(ray.pointAtParameter(t), new Vector(0, 0, -1)));
      return Vector.multiply(0.5, new Vector(N.x + 0.1, N.y + .7, N.z + 0.3));
    }

    const unitDirection = Vector.unitVector(ray.direction());
    t = 0.5 * (unitDirection.y + 1.0);
    return Vector.add(Vector.multiply((1.0 - t), new Vector(1.0, 1.0, 1.0)),
      Vector.multiply(t, new Vector(0.5, 0.7, 1.0)));
  }

  /*
  * center: Vector
  * radius: Float
  * ray: Ray*/
  static hitSphere(center, radius, ray) {
    const oc = Vector.subtract(ray.origin(), center);
    const a = Vector.dot(ray.direction(), ray.direction());
    const b = 2.0 * Vector.dot(oc, ray.direction());
    const c = Vector.dot(oc, oc) - radius * radius;

    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      return -1.0;
    } else {
      return (-b - Math.sqrt(discriminant)) / (2.0 * a);
    }
  }

  render() {
    // allows us to interface with CanvasPainter's internal canvas property
    const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    let arrayOffset = 0;

    const lowerLeftCorner = new Vector(-2.0, -1.0, -1.0);
    const horizontal = new Vector(4.0, 0.0, 0.0);
    const vertical = new Vector(0.0, 2.0, 0.0);
    const origin = new Vector(0.0, 0.0, 0.0);

    for (let j = this.canvas.height - 1; j >= 0; j--) {
      for (let i = 0; i < this.canvas.width; i++) {

        const a = '0xFF'; // maintain the value of the a pixel in rgba value at 255
        const u = i / this.canvas.width;
        const v = j / this.canvas.height;

        const direction = Vector.add(Vector.multiply(u, horizontal), Vector.multiply(v, vertical));
        const ray = new Ray(origin, Vector.add(lowerLeftCorner, direction));

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

const generateImage = canvas => {
  const img = new Image();
  img.src = canvas.toDataURL('image/png');
  document.getElementById('target').appendChild(img);
};

const main = () => {
  const canvas = document.createElement('canvas');
  const painter = new CanvasPainter(canvas, 400, 200);

  painter.render();
  generateImage(canvas);
};

main();
