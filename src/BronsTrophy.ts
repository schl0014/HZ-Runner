import ScoringObject from './ScoringObject.js';

export default class BronsTrophy extends ScoringObject {
  /**
   * Construct a new instance of this class
   *
   * @param canvas the canvas on which the player should exist
   */
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.image = BronsTrophy.loadNewImage('assets/img/objects/bronze_trophy.png');
    this.points = 10;
  }
}
