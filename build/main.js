import GameLoop from './GameLoop.js';
import KeyListener from './KeyListener.js';
console.log('Javascript is working!');
export default class Game {
    canvas;
    leftLane;
    middleLane;
    rightLane;
    keyListener;
    gameloop;
    playerImage;
    playerPositionX;
    trophyImage;
    trophyPositionX;
    trophyPositionY;
    trophySpeed;
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth / 3;
        this.canvas.height = window.innerHeight;
        this.leftLane = this.canvas.width / 4;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = (this.canvas.width / 4) * 3;
        this.keyListener = new KeyListener();
        this.trophyImage = Game.loadNewImage('assets/img/objects/gold_trophy.png');
        this.trophyPositionX = this.canvas.width / 2;
        this.trophyPositionY = 60;
        this.trophySpeed = 5;
        this.playerImage = Game.loadNewImage('./assets/img/players/character_robot_walk0.png');
        this.playerPositionX = this.canvas.width / 2;
        console.log('start animation');
        this.gameloop = new GameLoop(this);
        this.gameloop.start();
    }
    processInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)
            && this.playerPositionX !== this.leftLane) {
            this.playerPositionX = this.leftLane;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_UP)
            && this.playerPositionX !== this.middleLane) {
            this.playerPositionX = this.middleLane;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)
            && this.playerPositionX !== this.rightLane) {
            this.playerPositionX = this.rightLane;
        }
    }
    update(elapsed) {
        this.trophyPositionY += this.trophySpeed * elapsed;
        if (this.playerPositionX < this.trophyPositionX + this.trophyImage.width
            && this.playerPositionX + this.playerImage.width > this.trophyPositionX
            && this.canvas.height - 150 < this.trophyPositionY + this.trophyImage.height
            && this.canvas.height - 150 + this.playerImage.height > this.trophyPositionY) {
            const random = Game.randomInteger(1, 3);
            if (random === 1) {
                this.trophyPositionX = this.leftLane;
            }
            if (random === 2) {
                this.trophyPositionX = this.middleLane;
            }
            if (random === 3) {
                this.trophyPositionX = this.rightLane;
            }
            this.trophyImage = Game.loadNewImage('assets/img/objects/gold_trophy.png');
            this.trophyPositionY = 60;
            this.trophySpeed = 5;
        }
        if (this.trophyPositionY + this.trophyImage.height > this.canvas.height) {
            const random = Game.randomInteger(1, 3);
            if (random === 1) {
                this.trophyPositionX = this.leftLane;
            }
            if (random === 2) {
                this.trophyPositionX = this.middleLane;
            }
            if (random === 3) {
                this.trophyPositionX = this.rightLane;
            }
            this.trophyImage = Game.loadNewImage('assets/img/objects/gold_trophy.png');
            this.trophyPositionY = 60;
            this.trophySpeed = 5;
        }
        return false;
    }
    render() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas('UP arrow = middle | LEFT arrow = left | RIGHT arrow = right', this.canvas.width / 2, 40, 14);
        ctx.drawImage(this.playerImage, this.playerPositionX - this.playerImage.width / 2, this.canvas.height - 150);
        ctx.drawImage(this.trophyImage, this.trophyPositionX - this.trophyImage.width / 2, this.trophyPositionY);
    }
    writeTextToCanvas(text, xCoordinate, yCoordinate, fontSize = 20, color = 'red', alignment = 'center') {
        const ctx = this.canvas.getContext('2d');
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    static randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
window.addEventListener('load', () => new Game(document.getElementById('canvas')));
//# sourceMappingURL=main.js.map