console.log("Javascript is working!");

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', () => {
    console.log("Handling the Load event");

    const game = new Game(document.getElementById('canvas'));
});

/**
 * Main class of this Game.
 */
class Game {

    // The canvas
    private canvas: HTMLCanvasElement;

    // KeyListener so the user can give input
    private keyListener: KeyListener;

    // The player on the canvas
    private playerImage: HTMLImageElement;
    private playerPositionX: number;

    // The objects on the canvas
    // TODO make multiple objects instead of one
    private trophyImage: HTMLImageElement;
    private trophyPositionX: number;
    private trophyPositionY: number;
    private trophySpeed: number;

    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;

        // Resize the canvas so it looks more like a Runner game
        this.canvas.width = window.innerWidth / 3;
        this.canvas.height = window.innerHeight;

        this.keyListener = new KeyListener();

        // TODO create multiple objects over time
        this.trophyImage = this.loadNewImage("assets/img/objects/gold_trophy.png");
        this.trophyPositionX = this.canvas.width / 2;
        this.trophyPositionY = 60;
        this.trophySpeed = 5;

        // Set the player at the center
        this.playerImage = this.loadNewImage("./assets/img/players/character_robot_walk0.png");
        this.playerPositionX = this.canvas.width / 2;

        // Start the animation
        console.log('start animation');
        requestAnimationFrame(this.step);
    }


    /**
     * This MUST be an arrow method in order to keep the `this` variable
     * working correctly. It will be overwritten by another object otherwise
     * caused by javascript scoping behaviour.
     */
    step = () => {

        // x positions of the lanes in the canvas
        const leftLane = this.canvas.width / 4;
        const middleLane = this.canvas.width / 2;
        const rightLane = this.canvas.width / 4 * 3;

        // Move player
        if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) && this.playerPositionX !== leftLane) {
            this.playerPositionX = leftLane;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_UP) && this.playerPositionX !== middleLane) {
            this.playerPositionX = middleLane;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) && this.playerPositionX !== rightLane) {
            this.playerPositionX = rightLane;
        }

        // Move objects
        // TODO adjust for multiple objects
        this.trophyPositionY += this.trophySpeed;

        // Collision detection of objects and player
        // Use the bounding box detection method: https://computersciencewiki.org/index.php/Bounding_boxes
        // TODO adjust for multiple objects
        if (
            this.playerPositionX < this.trophyPositionX + this.trophyImage.width
            && this.playerPositionX + this.playerImage.width > this.trophyPositionX
            && this.canvas.height - 150 < this.trophyPositionY + this.trophyImage.height
            && this.canvas.height - 150 + this.playerImage.height > this.trophyPositionY
        ) {
            // Create a new trophy in a random lane
            const random = this.randomInteger(1, 3);
            if (random === 1) {
                this.trophyPositionX = leftLane;
            }
            if (random === 2) {
                this.trophyPositionX = middleLane;
            }
            if (random === 3) {
                this.trophyPositionX = rightLane;
            }

            this.trophyImage = this.loadNewImage("assets/img/objects/gold_trophy.png");
            this.trophyPositionY = 60;
            this.trophySpeed = 5;
        }

        // Collision detection of objects with bottom of the canvas
        if (this.trophyPositionY + this.trophyImage.height > this.canvas.height) {
            // Create a new trophy in a random lane
            const random = this.randomInteger(1, 3);
            if (random === 1) {
                this.trophyPositionX = leftLane;
            }
            if (random === 2) {
                this.trophyPositionX = middleLane;
            }
            if (random === 3) {
                this.trophyPositionX = rightLane;
            }

            this.trophyImage = this.loadNewImage("assets/img/objects/gold_trophy.png");
            this.trophyPositionY = 60;
            this.trophySpeed = 5;
        }

        // Render the items on the canvas
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');
        // Clear the entire canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.fillText("UP arrow = middle | LEFT arrow = left | RIGHT arrow = right", leftLane, 40);

        // Render the player
        // Center the image in the lane with the x coordinates
        ctx.drawImage(
            this.playerImage,
            this.playerPositionX - this.playerImage.width / 2,
            this.canvas.height - 150
        );

        // Render the objects
        // Center the image in the lane with the x coordinates
        ctx.drawImage(
            this.trophyImage,
            this.trophyPositionX - this.trophyImage.width / 2,
            this.trophyPositionY
        );

        // Call this method again on the next animation frame
        // The user must hit F5 to reload the game
        requestAnimationFrame(this.step);
    }

    /**
    * Generates a random integer number between min and max
    *
    * @param {number} min - minimal time
    * @param {number} max - maximal time
    */
    public randomInteger(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    /**
    * Loads an image in such a way that the screen doesn't constantly flicker
    * @param {HTMLImageElement} source
    * @return HTMLImageElement - returns an image
    */
    private loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }

}
