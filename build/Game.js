import GameLoop from './GameLoop.js';
import Player from './Player.js';
import GoldTrophy from './GoldTrophy.js';
import LightningBolt from './LightningBolt.js';
import RedCross from './RedCross.js';
import SilverTrophy from './SilverTrophy.js';
export default class Game {
    canvas;
    gameloop;
    player;
    goldTrophy;
    silverTrophy;
    redCross;
    lightningBolt;
    totalScore;
    constructor(canvas) {
        this.canvas = canvas;
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
        if (this.goldTrophy !== null) {
            this.goldTrophy.move(elapsed);
            if (this.player.collidesWithGoldTrophy(this.goldTrophy)) {
                this.totalScore += this.goldTrophy.getPoints();
                this.createRandomScoringObject();
            }
            else if (this.goldTrophy.collidesWithCanvasBottom()) {
                this.createRandomScoringObject();
            }
        }
        if (this.silverTrophy !== null) {
            this.silverTrophy.move(elapsed);
            if (this.player.collidesWithSilverTrophy(this.silverTrophy)) {
                this.totalScore += this.silverTrophy.getPoints();
                this.createRandomScoringObject();
            }
            else if (this.silverTrophy.collidesWithCanvasBottom()) {
                this.createRandomScoringObject();
            }
        }
        if (this.redCross !== null) {
            this.redCross.move(elapsed);
            if (this.player.collidesWithRedCross(this.redCross)) {
                this.totalScore += this.redCross.getPoints();
                this.createRandomScoringObject();
            }
            else if (this.redCross.collidesWithCanvasBottom()) {
                this.createRandomScoringObject();
            }
        }
        if (this.lightningBolt !== null) {
            this.lightningBolt.move(elapsed);
            if (this.player.collidesWithLightningBolt(this.lightningBolt)) {
                this.totalScore += this.lightningBolt.getPoints();
                this.createRandomScoringObject();
            }
            else if (this.lightningBolt.collidesWithCanvasBottom()) {
                this.createRandomScoringObject();
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
        if (this.goldTrophy !== null) {
            this.goldTrophy.draw(ctx);
        }
        else if (this.silverTrophy !== null) {
            this.silverTrophy.draw(ctx);
        }
        else if (this.redCross !== null) {
            this.redCross.draw(ctx);
        }
        else if (this.lightningBolt !== null) {
            this.lightningBolt.draw(ctx);
        }
    }
    drawScore() {
        this.writeTextToCanvas(`Score: ${this.totalScore}`, this.canvas.width / 2, 80, 16);
    }
    createRandomScoringObject() {
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