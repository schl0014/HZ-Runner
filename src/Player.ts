import KeyListener from './KeyListener.js';
import GoldTrophy from './GoldTrophy.js';
import LightningBolt from './LightningBolt.js';
import RedCross from './RedCross.js';
import SilverTrophy from './SilverTrophy.js';

export default class Player {
  private canvas: HTMLCanvasElement;

  private leftLane: number;

  private middleLane: number;

  private rightLane: number;

  private keyListener: KeyListener;

  private image: HTMLImageElement;

  private positionX: number;

  /**
   * Construct a new Player instance
   *
   * @param canvas the canvas on which the player should exist
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.leftLane = this.canvas.width / 4;
    this.middleLane = this.canvas.width / 2;
    this.rightLane = (this.canvas.width / 4) * 3;

    this.keyListener = new KeyListener();

    this.image = Player.loadNewImage('./assets/img/players/character_robot_walk0.png');
    this.positionX = this.canvas.width / 2;
  }

  /**
   * Moves the player
   */
  public move(): void {
    if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) && this.positionX !== this.leftLane) {
      this.positionX = this.leftLane;
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_UP) && this.positionX !== this.middleLane) {
      this.positionX = this.middleLane;
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) && this.positionX !== this.rightLane) {
      this.positionX = this.rightLane;
    }
  }

  /**
   * Renders the player
   *
   * @param ctx the rendering context to draw on
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.image,
      // Center the image in the lane with the x coordinates
      this.positionX - this.image.width / 2,
      this.canvas.height - 150,
    );
  }

  /**
   * Collision detection of gold trophy and player
   * Use bounding box detection method: https://computersciencewiki.org/index.php/Bounding_boxes
   *
   * @param goldTrophy the specified GoldTrophy object
   * @returns `true` if the player collides with the GoldTrophy
   */
  public collidesWithGoldTrophy(goldTrophy: GoldTrophy): boolean {
    if (this.positionX < goldTrophy.getPositionX() + goldTrophy.getImageWidth()
            && this.positionX + this.image.width > goldTrophy.getPositionX()
            && this.canvas.height - 150 < goldTrophy.getPositionY() + goldTrophy.getImageHeight()
            && this.canvas.height - 150 + this.image.height > goldTrophy.getPositionY()
    ) {
      return true;
    }

    return false;
  }

  /**
   * Collision detection of silver trophy and player
   * Use bounding box detection method: https://computersciencewiki.org/index.php/Bounding_boxes
   *
   * @param silverTrophy the specified SilverTrophy object
   * @returns `true` if the player collides with the specified SilverTrophy
   */
  public collidesWithSilverTrophy(silverTrophy: SilverTrophy): boolean {
    if (this.positionX < silverTrophy.getPositionX() + silverTrophy.getImageWidth()
            && this.positionX + this.image.width > silverTrophy.getPositionX()
            && this.canvas.height - 150 < silverTrophy.getPositionY()
            + silverTrophy.getImageHeight()
            && this.canvas.height - 150 + this.image.height > silverTrophy.getPositionY()
    ) {
      return true;
    }

    return false;
  }

  /**
   * Collision detection of red cross and player
   * Use bounding box detection method: https://computersciencewiki.org/index.php/Bounding_boxes
   *
   * @param redCross the specified RedCross object
   * @returns `true` if the player collides with the specified RedCross
   */
  public collidesWithRedCross(redCross: RedCross): boolean {
    if (this.positionX < redCross.getPositionX() + redCross.getImageWidth()
            && this.positionX + this.image.width > redCross.getPositionX()
            && this.canvas.height - 150 < redCross.getPositionY() + redCross.getImageHeight()
            && this.canvas.height - 150 + this.image.height > redCross.getPositionY()
    ) {
      return true;
    }

    return false;
  }

  /**
   * Collision detection of lightning bolt and player
   * Use bounding box detection method: https://computersciencewiki.org/index.php/Bounding_boxes
   *
   * @param lightningBolt the specified LightningBolt object
   * @returns `true` if the player collides with the specified LightningBolt
   */
  public collidesWithLightningBolt(lightningBolt: LightningBolt): boolean {
    if (this.positionX < lightningBolt.getPositionX() + lightningBolt.getImageWidth()
            && this.positionX + this.image.width > lightningBolt.getPositionX()
            && this.canvas.height - 150 < lightningBolt.getPositionY()
            + lightningBolt.getImageHeight()
            && this.canvas.height - 150 + this.image.height > lightningBolt.getPositionY()
    ) {
      return true;
    }

    return false;
  }

  /**
   * Loads an image in such a way that the screen doesn't constantly flicker
   *
   *
   * NOTE: this is a 'static' method. This means that this method must be called like
   * `Game.loadNewImage()` instead of `this.loadNewImage()`.
   *
   * @param source The address or URL of the a media resource that is to be loaded
   * @returns an HTMLImageElement with the source as its src attribute
   */
  private static loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }
}
