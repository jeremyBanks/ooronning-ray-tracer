import Hitable, { HitRecord } from './Hitable';
import Vector from './Vector';
import Ray from './Ray';

export default class Sphere extends Hitable {
  center: Vector;
  radius: number;
  
  constructor(cen: Vector, r: number) {
    super();

    this.center = cen;
    this.radius = r;
  }

  hit(ray: Ray, tMin: number, tMax: number, rec: HitRecord) : boolean {
    const oc: Vector = Vector.subtract(ray.origin(), this.center);
    const a: number = Vector.dot(ray.direction(), ray.direction());
    const b: number = Vector.dot(oc, ray.direction());
    const c: number = Vector.dot(oc, oc) - this.radius * this.radius;

    const discriminant: number = b*b - a*c;

    if (discriminant > 0) {
      let temp: number = (-b - Math.sqrt(b*b - a*c)) / a;

      if (temp < tMax && temp > tMin) {
        rec.t = temp;
        rec.p = ray.pointAtParameter(rec.t);
        rec.normal = Vector.divide(Vector.subtract(rec.p, this.center), this.radius);
        return true;
      }
      
      temp = (-b + Math.sqrt(b*b - a*c)) / a;
      if (temp < tMax && temp > tMin) {
        rec.t = temp;
        rec.p = ray.pointAtParameter(rec.t);
        rec.normal = Vector.divide(Vector.subtract(rec.p, this.center), this.radius);
        return true;
      }
    }
    return false;
  }
}