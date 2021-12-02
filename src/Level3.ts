import Level from './Level.js';

export default class Level3 extends Level {
  /**
   * @param canvas can as
   */
  public constructor(canvas:HTMLElement) {
    super(canvas);
    this.scoreToProgress = 25;

    this.spawnRate = 69;
  }
}
