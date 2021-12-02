import GoldTrophy from './GoldTrophy.js';
import LightningBolt from './LightningBolt.js';
import Player from './Player.js';
import RedCross from './RedCross.js';
import Scene from './Scene.js';
import ScoringObject from './ScoringObject.js';
import SilverTrophy from './SilverTrophy.js';

export default class Level extends Scene {
  private player: Player;

  private scoringObjects: ScoringObject[];

  public score: number;

  protected scoreToProgress: number;

  protected spawnRate: number;

  private scene: Scene;

  /**
   * Construct a new Level
   *
   * @param canvas The canvas HTML element to render on
   */
  public constructor(canvas: HTMLElement) {
    super(canvas);
    this.canvas = <HTMLCanvasElement>canvas;
    // Resize the canvas so it looks more like a Runner game
    this.canvas.width = window.innerWidth / 3;
    this.canvas.height = window.innerHeight;

    this.scoringObjects = [];
    this.createRandomScoringObject();

    // Set the player at the center
    this.player = new Player(this.canvas);

    // Score is zero at start
    this.score = 0;
  }

  /**
   * Handles any user input that has happened since the last call
   */
  public processInput(): void {
    // Move player
    this.player.move();
  }

  /**
   * Advances the game simulation one step. It may run AI and physics (usually
   * in that order)
   *
   * @param elapsed the amount of frames that have passed
   *   call
   * @param frameCount The amount of frames that are processed since the start of the game
   * @returns `true` if the game should stop animation
   */
  public update(elapsed: number, frameCount: number): boolean {
    // Spawn a new scoring object every 45 frames
    if (frameCount % this.spawnRate === 0) {
      this.createRandomScoringObject();
    }

    // Move objects
    // Could also be a regular for loop
    this.scoringObjects.forEach((scoringObject) => {
      scoringObject.move(elapsed);

      if (this.player.collidesWith(scoringObject)) {
        this.score += scoringObject.getPoints();
        this.removeItemFromScoringObjects(scoringObject);
      } else if (scoringObject.collidesWithCanvasBottom()) {
        this.removeItemFromScoringObjects(scoringObject);
      }
    });
    return false;
  }

  /**
   * Draw the game so the player can see what happened
   */
  public render(): void {
    // Render the items on the canvas
    // Get the canvas rendering context
    const ctx = this.canvas.getContext('2d');
    // Clear the entire canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.writeTextToCanvas('UP arrow = middle | LEFT arrow = left | RIGHT arrow = right', this.canvas.width / 2, 40, 14);

    this.drawScore();

    this.player.draw(ctx);

    // Could also be a regular for loop
    this.scoringObjects.forEach((scoringObject) => {
      scoringObject.draw(ctx);
    });
  }

  /**
   * returns wheter the level is completed
   *
   * @returns whether level is completed
   */
  public isCompleted(): boolean {
    return this.score >= this.scoreToProgress;
  }

  /**
   * Draw the score on a canvas
   */
  private drawScore(): void {
    this.writeTextToCanvas(`Score: ${this.score}`, this.canvas.width / 2, 80, 16);
  }

  /**
   * Create a random scoring object and clear the other scoring objects by setting them to `null`.
   */
  private createRandomScoringObject(): void {
    const random = Level.randomInteger(1, 4);

    if (random === 1) {
      this.scoringObjects.push(new GoldTrophy(this.canvas));
    }

    if (random === 2) {
      this.scoringObjects.push(new SilverTrophy(this.canvas));
    }

    if (random === 3) {
      this.scoringObjects.push(new RedCross(this.canvas));
    }

    if (random === 4) {
      this.scoringObjects.push(new LightningBolt(this.canvas));
    }
  }

  /**
   * Removes an item from the this.scoringObjects array.
   * Could also be written using a filter
   *
   * @param item To be removed
   */
  private removeItemFromScoringObjects(item: ScoringObject): void {
    const index = this.scoringObjects.indexOf(item);
    this.scoringObjects.splice(index, 1);
  }

  /**
   * Generates a random integer number between min and max
   *
   * NOTE: this is a 'static' method. This means that this method must be called like
   * `Game.randomInteger()` instead of `this.randomInteger()`.
   *
   * @param min - minimal time
   * @param max - maximal time
   * @returns a random integer number between min and max
   */
  public static randomInteger(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}
