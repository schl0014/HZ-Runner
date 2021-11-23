export default class SilverTrophy {
    canvas;
    leftLane;
    middleLane;
    rightLane;
    image;
    positionX;
    positionY;
    speed;
    points;
    constructor(canvas) {
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 4;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = (this.canvas.width / 4) * 3;
        const random = SilverTrophy.randomInteger(1, 3);
        if (random === 1) {
            this.positionX = this.leftLane;
        }
        if (random === 2) {
            this.positionX = this.middleLane;
        }
        if (random === 3) {
            this.positionX = this.rightLane;
        }
        this.image = SilverTrophy.loadNewImage('assets/img/objects/silver_trophy.png');
        this.positionY = 60;
        this.speed = 1;
        this.points = 5;
    }
    move(elapsed) {
        this.positionY += this.speed * elapsed;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.positionY);
    }
    collidesWithCanvasBottom() {
        if (this.positionY + this.image.height > this.canvas.height) {
            return true;
        }
        return false;
    }
    getPositionX() {
        return this.positionX;
    }
    getPositionY() {
        return this.positionY;
    }
    getImageWidth() {
        return this.image.width;
    }
    getImageHeight() {
        return this.image.height;
    }
    getPoints() {
        return this.points;
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
//# sourceMappingURL=SilverTrophy.js.map