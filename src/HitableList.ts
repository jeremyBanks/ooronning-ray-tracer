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

  hit(ray: Ray, tMin: number, tMax: number, rec: HitRecord): boolean {
    // let tempRec: HitRecord;
    const tempRec: HitRecord = {
      t: 0,
      p: new Vector(0, 0, 0),
      normal: new Vector(0, 0, 0)
    };
    let hitAnything: boolean = false;
    let closestSoFar: number = tMax;

    for (let i = 0; i < this.listSize; i++) {
      if (this.list[i].hit(ray, tMin, closestSoFar, tempRec)) {
        hitAnything = true;
        closestSoFar = tempRec.t;
        rec = tempRec;
      }
    }

    return hitAnything;
  }
}
