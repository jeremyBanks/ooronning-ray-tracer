import Hitable, { HitRecord } from './Hitable';
import Vector from './Vector';
import Ray from './Ray';

export default class HitableList extends Hitable {
  list: Array<Hitable>;
  listSize: number;

  constructor(l: Array<Hitable>, n: number) {
    super();

    this.list = l;
    this.listSize = n;
  }

  hit(ray: Ray, tMin: number, tMax: number): HitRecord | null {
    let hitAnything: boolean = false;
    let closestSoFar: HitRecord | null = null;

    for (let i = 0; i < this.listSize; i++) {
      const tempRec = this.list[i].hit(ray, tMin, closestSoFar ? closestSoFar.t : Infinity);
      if (tempRec) {
        hitAnything = true;
        closestSoFar = tempRec;
      }
    }

    return closestSoFar;
  }
}
