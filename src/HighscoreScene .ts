import Level from './Level.js';
import Scene from './Scene.js';

export default class HighscoreScene extends Scene {
  /**
   * inititlize Highscorescene
   *
   * @param canvas The canvas HTML element to render on
   */
  constructor(canvas:HTMLElement) {
    super(canvas);
    this.level = new Level(canvas);
  }

  /**
   *
   */
  public render():void {
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.writeTextToCanvas('you are finished', this.canvas.width / 2, 40, 14);
    this.writeTextToCanvas(`totalscore:${this.level.score}`, this.canvas.width / 2, 55, 14);
  }
}
