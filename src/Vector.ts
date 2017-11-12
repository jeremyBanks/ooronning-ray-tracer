export default class Vector {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x * 1.0;
    this.y = y * 1.0;
    this.z = z * 1.0;
  }

  length() : number {
    return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
  }

  squaredLength() : number {
    return (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
  }

  makeUnitVector() : void {
    const k = 1.0 / this.length();
    this.x *= k;
    this.y *= k;
    this.z *= k;
  }

  add(v: Vector) : Vector {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;

    return this;
  }

  subtract(v: Vector) : Vector {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;

    return this;
  }

  multiply(arg: number|Vector) : Vector {
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

  divide(arg: number|Vector) : Vector {
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

  static add(v1: Vector, v2: Vector) : Vector {
    return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }

  static subtract(v1: Vector, v2: Vector) : Vector {
    return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
  }

  static multiply(arg1: number|Vector, arg2: number|Vector) : Vector {
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

  static divide(v1: number|Vector, arg2: number|Vector) : Vector {
    if (arg2 instanceof Vector) {
      return new Vector(v1.x / arg2.x, v1.y / arg2.y, v1.z / arg2.z);
    }

    return new Vector(v1.x / arg2, v1.y / arg2, v1.z / arg2);
  }

  static dot(v1: Vector, v2: Vector) : number {
    // return new Vector(v1.x * v2.x + v1.y * v2.y + v1.z * v2.z);
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  static cross(v1: Vector, v2: Vector) : Vector {
    return new Vector(
      (v1.y * v2.z) - (v1.z * v2.y),
      -((v1.x * v2.z) - (v1.z * v2.x)),
      (v1.x * v2.y) - (v1.y * v2.x)
    );
  }

  static unitVector(v: Vector) : Vector {
    const l = v.length();
    return new Vector(v.x / l, v.y / l, v.z / l);
  }
}