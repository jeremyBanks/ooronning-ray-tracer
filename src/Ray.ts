import Vector from './Vector';

export default class Ray {
  a: Vector;
  b: Vector;

  constructor(vecA, vecB) {
    this.a = vecA;
    this.b = vecB;
  }

  origin(): Vector {
    return this.a;
  }

  direction(): Vector {
    return this.b;
  }

  pointAtParameter(t): Vector {
    return Vector.add(this.a, Vector.multiply(t, this.b));
  }
}