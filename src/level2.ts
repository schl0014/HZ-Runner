import Level from './Level.js';

export default class Level2 extends Level {
  /**
   * @param canvas can as
   */
  public constructor(canvas:HTMLElement) {
    super(canvas);
    this.scoreToProgress = 20;
    this.spawnRate = 140;
  }
}
