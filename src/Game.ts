import GameLoop from './GameLoop.js';
import HighscoreScene from './HighscoreScene .js';
import Level from './Level.js';
import Level1 from './Level1.js';
import Level2 from './level2.js';
import Level3 from './Level3.js';
import Scene from './Scene.js';

/**
 * Main class of this Game.
 */
export default class Game {
  private gameloop: GameLoop;

  private isFinished: boolean;

  private levels:Level[];

  private highScoreScene:HighscoreScene;

  private currentlevel:number;

  private scene:Scene;

  /**
   * Construct a new Game
   *
   * @param canvas The canvas HTML element to render on
   */
  public constructor(canvas: HTMLElement) {
    this.highScoreScene = new HighscoreScene(canvas);
    this.isFinished = false;
    this.currentlevel = 0;
    this.levels = [new Level1(canvas),
      new Level2(canvas),
      new Level3(canvas)];
    // Start the animation
    console.log('start animation');
    this.gameloop = new GameLoop(this);
    this.gameloop.start();
  }

  /**
   * Advances the game simulation one step. It may run AI and physics (usually
   * in that order)
   *
   * @param elapsed the amount of frames that have passed
   * @returns the level update
   */
  public update(elapsed: number): boolean {
    if (this.levels[this.currentlevel].isCompleted()) {
      this.currentlevel += 1;
    }
    if (this.levels[this.currentlevel].score < 0) {
      this.highScoreScene.render();
      // console.log('test');
      this.isFinished = true;

      if (this.currentlevel >= this.levels.length) {
        if (this.levels[this.currentlevel].isCompleted()) {
          this.highScoreScene.render();
          console.log('test');
          this.isFinished = true;
        }
      }
    }
    return this.levels[this.currentlevel].update(elapsed, this.gameloop.frameCount);
  }

  /**
   *
   */
  public processInput(): void {
    this.levels[this.currentlevel].processInput();
  }

  /**
   *
   */
  public render(): void {
    if (this.isFinished === false) {
      this.levels[this.currentlevel].render();
    }
  }
}
