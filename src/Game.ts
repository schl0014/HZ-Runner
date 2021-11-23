import GameLoop from './GameLoop.js';
import Player from './Player.js';
import GoldTrophy from './GoldTrophy.js';
import LightningBolt from './LightningBolt.js';
import RedCross from './RedCross.js';
import SilverTrophy from './SilverTrophy.js';

/**
 * Main class of this Game.
 */
export default class Game {
  // The canvas
  private canvas: HTMLCanvasElement;

  private gameloop: GameLoop;

  // The player on the canvas
  private player: Player;

  // The objects on the canvas
  private goldTrophy: GoldTrophy;

  private silverTrophy: SilverTrophy;

  private redCross: RedCross;

  private lightningBolt: LightningBolt;

  // Score
  private totalScore: number;

  /**
   * Construct a new Game
   *
   * @param canvas The canvas HTML element to render on
   */
  public constructor(canvas: HTMLElement) {
    this.canvas = <HTMLCanvasElement>canvas;

    // Resize the canvas so it looks more like a Runner game
    this.canvas.width = window.innerWidth / 3;
    this.canvas.height = window.innerHeight;

    // TODO create multiple objects over time
    this.createRandomScoringObject();

    // Set the player at the center
    this.player = new Player(this.canvas);

    // Score is zero at start
    this.totalScore = 0;

    // Start the animation
    console.log('start animation');
    this.gameloop = new GameLoop(this);
    this.gameloop.start();
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
   * @param elapsed the time in ms that has been elapsed since the previous
   *   call
   * @returns `true` if the game should stop animation
   */
  public update(elapsed: number): boolean {
    // TODO this is ... sooo much code for so little
    if (this.goldTrophy !== null) {
      this.goldTrophy.move(elapsed);

      if (this.player.collidesWithGoldTrophy(this.goldTrophy)) {
        this.totalScore += this.goldTrophy.getPoints();
        this.createRandomScoringObject();
      } else if (this.goldTrophy.collidesWithCanvasBottom()) {
        this.createRandomScoringObject();
      }
    }

    // Same but for silver trophies
    if (this.silverTrophy !== null) {
      this.silverTrophy.move(elapsed);

      if (this.player.collidesWithSilverTrophy(this.silverTrophy)) {
        this.totalScore += this.silverTrophy.getPoints();
        this.createRandomScoringObject();
      } else if (this.silverTrophy.collidesWithCanvasBottom()) {
        this.createRandomScoringObject();
      }
    }

    // And red crosses
    if (this.redCross !== null) {
      this.redCross.move(elapsed);

      if (this.player.collidesWithRedCross(this.redCross)) {
        this.totalScore += this.redCross.getPoints();
        this.createRandomScoringObject();
      } else if (this.redCross.collidesWithCanvasBottom()) {
        this.createRandomScoringObject();
      }
    }

    // There should be some way to solve this mess right
    if (this.lightningBolt !== null) {
      this.lightningBolt.move(elapsed);

      if (this.player.collidesWithLightningBolt(this.lightningBolt)) {
        this.totalScore += this.lightningBolt.getPoints();
        this.createRandomScoringObject();
      } else if (this.lightningBolt.collidesWithCanvasBottom()) {
        this.createRandomScoringObject();
      }
    }
    // Move objects
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

    if (this.goldTrophy !== null) {
      this.goldTrophy.draw(ctx);
    } else if (this.silverTrophy !== null) {
      this.silverTrophy.draw(ctx);
    } else if (this.redCross !== null) {
      this.redCross.draw(ctx);
    } else if (this.lightningBolt !== null) {
      this.lightningBolt.draw(ctx);
    }
  }

  /**
   * Draw the score on a canvas
   */
  private drawScore(): void {
    this.writeTextToCanvas(`Score: ${this.totalScore}`, this.canvas.width / 2, 80, 16);
  }

  /**
   * Create a random scoring object and clear the other scoring objects by setting them to `null`.
   */
  private createRandomScoringObject(): void {
    this.goldTrophy = null;
    this.silverTrophy = null;
    this.redCross = null;
    this.lightningBolt = null;

    const random = Game.randomInteger(1, 4);

    if (random === 1) {
      this.goldTrophy = new GoldTrophy(this.canvas);
    }

    if (random === 2) {
      this.silverTrophy = new SilverTrophy(this.canvas);
    }

    if (random === 3) {
      this.redCross = new RedCross(this.canvas);
    }

    if (random === 4) {
      this.lightningBolt = new LightningBolt(this.canvas);
    }
  }

  /**
   * Writes text to the canvas
   *
   * @param text - Text to write
   * @param xCoordinate - Horizontal coordinate in pixels
   * @param yCoordinate - Vertical coordinate in pixels
   * @param fontSize - Font size in pixels
   * @param color - The color of the text
   * @param alignment - Where to align the text
   */
  public writeTextToCanvas(
    text: string,
    xCoordinate: number,
    yCoordinate: number,
    fontSize: number = 20,
    color: string = 'red',
    alignment: CanvasTextAlign = 'center',
  ): void {
    const ctx = this.canvas.getContext('2d');
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = alignment;
    ctx.fillText(text, xCoordinate, yCoordinate);
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
