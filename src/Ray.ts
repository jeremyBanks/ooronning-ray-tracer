import Vector from './Vector';

export default class Ray {
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