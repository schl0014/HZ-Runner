import ScoringObject from './ScoringObject.js';
export default class RedCross extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = RedCross.loadNewImage('assets/img/objects/tilted_cross.png');
        this.points = -5;
    }
}
//# sourceMappingURL=RedCross.js.map