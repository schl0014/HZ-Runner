import KeyListener from './KeyListener.js';
export default class Player {
    canvas;
    leftLane;
    middleLane;
    rightLane;
    keyListener;
    image;
    positionX;
    constructor(canvas) {
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 4;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = (this.canvas.width / 4) * 3;
        this.keyListener = new KeyListener();
        this.image = Player.loadNewImage('./assets/img/players/character_robot_walk0.png');
        this.positionX = this.canvas.width / 2;
    }
    move() {
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
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.canvas.height - 150);
    }
    collidesWithGoldTrophy(goldTrophy) {
        if (this.positionX < goldTrophy.getPositionX() + goldTrophy.getImageWidth()
            && this.positionX + this.image.width > goldTrophy.getPositionX()
            && this.canvas.height - 150 < goldTrophy.getPositionY() + goldTrophy.getImageHeight()
            && this.canvas.height - 150 + this.image.height > goldTrophy.getPositionY()) {
            return true;
        }
        return false;
    }
    collidesWithSilverTrophy(silverTrophy) {
        if (this.positionX < silverTrophy.getPositionX() + silverTrophy.getImageWidth()
            && this.positionX + this.image.width > silverTrophy.getPositionX()
            && this.canvas.height - 150 < silverTrophy.getPositionY()
                + silverTrophy.getImageHeight()
            && this.canvas.height - 150 + this.image.height > silverTrophy.getPositionY()) {
            return true;
        }
        return false;
    }
    collidesWithRedCross(redCross) {
        if (this.positionX < redCross.getPositionX() + redCross.getImageWidth()
            && this.positionX + this.image.width > redCross.getPositionX()
            && this.canvas.height - 150 < redCross.getPositionY() + redCross.getImageHeight()
            && this.canvas.height - 150 + this.image.height > redCross.getPositionY()) {
            return true;
        }
        return false;
    }
    collidesWithLightningBolt(lightningBolt) {
        if (this.positionX < lightningBolt.getPositionX() + lightningBolt.getImageWidth()
            && this.positionX + this.image.width > lightningBolt.getPositionX()
            && this.canvas.height - 150 < lightningBolt.getPositionY()
                + lightningBolt.getImageHeight()
            && this.canvas.height - 150 + this.image.height > lightningBolt.getPositionY()) {
            return true;
        }
        return false;
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
//# sourceMappingURL=Player.js.map