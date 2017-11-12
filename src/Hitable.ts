import Ray from './Ray';
import Vector from './Vector';

export interface HitRecord {
  t: number;
  p: Vector;
  normal: Vector;
}

export default abstract class Hitable {
  abstract hit(ray: Ray, tMin: number, tMax: number, rec: HitRecord|null): HitRecord|null;
}
