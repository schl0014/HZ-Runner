import GameLoop from './GameLoop.js';
import Player from './Player.js';
import GoldTrophy from './GoldTrophy.js';
import LightningBolt from './LightningBolt.js';
import RedCross from './RedCross.js';
import SilverTrophy from './SilverTrophy.js';
import BronsTrophy from './BronsTrophy.js';
export default class Game {
    canvas;
    gameloop;
    player;
    scoringobjects;
    totalScore;
    constructor(canvas) {
        this.canvas = canvas;
        this.scoringobjects = [];
        this.canvas.width = window.innerWidth / 3;
        this.canvas.height = window.innerHeight;
        this.createRandomScoringObject();
        this.player = new Player(this.canvas);
        this.totalScore = 0;
        console.log('start animation');
        this.gameloop = new GameLoop(this);
        this.gameloop.start();
    }
    processInput() {
        this.player.move();
    }
    update(elapsed) {
        if (this.gameloop.frameCount % 100 === 0) {
            this.createRandomScoringObject();
        }
        for (let j = 0; j < this.scoringobjects.length; j++) {
            if (this.scoringobjects !== null) {
                this.scoringobjects[j].move(elapsed);
                if (this.player.collidesWith(this.scoringobjects[j])) {
                    this.totalScore += this.scoringobjects[j].getPoints();
                    this.scoringobjects.splice(0, 1);
                }
                else if (this.scoringobjects[j].collidesWithCanvasBottom()) {
                    this.scoringobjects.splice(0, 1);
                }
            }
        }
        return false;
    }
    render() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas('UP arrow = middle | LEFT arrow = left | RIGHT arrow = right', this.canvas.width / 2, 40, 14);
        this.drawScore();
        this.player.draw(ctx);
        if (this.scoringobjects !== null) {
            for (let i = 0; i < this.scoringobjects.length; i++) {
                this.scoringobjects[i].draw(ctx);
            }
        }
    }
    drawScore() {
        this.writeTextToCanvas(`Score: ${this.totalScore}`, this.canvas.width / 2, 80, 16);
    }
    createRandomScoringObject() {
        const random = Game.randomInteger(1, 5);
        if (random === 1) {
            this.scoringobjects.push(new GoldTrophy(this.canvas));
        }
        if (random === 2) {
            this.scoringobjects.push(new SilverTrophy(this.canvas));
        }
        if (random === 3) {
            this.scoringobjects.push(new RedCross(this.canvas));
        }
        if (random === 4) {
            this.scoringobjects.push(new LightningBolt(this.canvas));
        }
        if (random === 5) {
            this.scoringobjects.push(new BronsTrophy(this.canvas));
        }
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
}
//# sourceMappingURL=Game.js.map