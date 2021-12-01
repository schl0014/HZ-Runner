import ScoringObject from './ScoringObject.js';
export default class BronsTrophy extends ScoringObject {
    constructor(canvas) {
        super(canvas);
        this.image = BronsTrophy.loadNewImage('assets/img/objects/bronze_trophy.png');
        this.points = 10;
    }
}
//# sourceMappingURL=BronsTrophy.js.map