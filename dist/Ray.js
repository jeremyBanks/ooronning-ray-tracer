define(["require", "exports", "./Vector"], function (require, exports, Vector_1) {
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
//# sourceMappingURL=Ray.js.map