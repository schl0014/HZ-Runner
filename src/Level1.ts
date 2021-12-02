import Level from './Level.js';

export default class Level1 extends Level {
  /**
   * @param canvas can as
   */
  public constructor(canvas:HTMLElement) {
    super(canvas);
    this.scoreToProgress = 15;
    this.spawnRate = 180;
  }
}
