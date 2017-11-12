import Vector from './Vector';

export default class Ray {
  a: Vector;
  b: Vector;

  constructor(vecA: Vector, vecB: Vector) {
    this.a = vecA;
    this.b = vecB;
  }

  origin(): Vector {
    return this.a;
  }

  direction(): Vector {
    return this.b;
  }

  pointAtParameter(t: number): Vector {
    return Vector.add(this.a, Vector.multiply(t, this.b));
  }
}