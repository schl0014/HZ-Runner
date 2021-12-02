import Level from './Level.js';

export default class Scene {
  protected canvas: HTMLCanvasElement;

  protected level:Level;

  /**
   * Construct a new Level
   *
   * @param canvas The canvas HTML element to render on
   * @param scoreToProgress Defines when level is complete
   */
  public constructor(canvas: HTMLElement) {
    this.canvas = <HTMLCanvasElement>canvas;
    // this.level = new Level(canvas);

    // Resize the canvas so it looks more like a Runner game
    this.canvas.width = window.innerWidth / 3;
    this.canvas.height = window.innerHeight;
  }

  /**
   * Handles any user input that has happened since the last call
   */
  protected processInput():void {
  }

  /**
   * Advances the game simulation one step. It may run AI and physics (usually
   * in that order)
   *
   * @param elapsed the amount of frames that have passed
   *   call
   * @param frameCount
   * @returns `true` if the game should stop animation
   */
  protected update(elapsed: number, frameCount: number): boolean { return false; }

  /**
   * Draw the game so the player can see what happened
   */
  protected render(): void {
    // Render the items on the canvas
    // Get the canvas rendering context
    const ctx = this.canvas.getContext('2d');
    // Clear the entire canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * returns wheter the level is completed
   *
   * @returns whether level is completed
   */
  protected isCompleted():boolean {
    return false;
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
}
