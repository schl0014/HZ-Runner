class KeyListener {
    constructor() {
        this.keyCodeStates = new Array();
        this.keyCodeTyped = new Array();
        this.previousState = new Array();
        window.addEventListener("keydown", (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        });
        window.addEventListener("keyup", (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        });
    }
    onFrameStart() {
        this.keyCodeTyped = new Array();
        this.keyCodeStates.forEach((val, key) => {
            if (this.previousState[key] != val && !this.keyCodeStates[key]) {
                this.keyCodeTyped[key] = true;
                this.previousState[key] = val;
            }
        });
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] == true;
    }
    isKeyTyped(keyCode) {
        return this.keyCodeTyped[keyCode] == true;
    }
}
KeyListener.KEY_ENTER = 13;
KeyListener.KEY_SHIFT = 16;
KeyListener.KEY_CTRL = 17;
KeyListener.KEY_ALT = 18;
KeyListener.KEY_ESC = 27;
KeyListener.KEY_SPACE = 32;
KeyListener.KEY_LEFT = 37;
KeyListener.KEY_UP = 38;
KeyListener.KEY_RIGHT = 39;
KeyListener.KEY_DOWN = 40;
KeyListener.KEY_DEL = 46;
KeyListener.KEY_1 = 49;
KeyListener.KEY_2 = 50;
KeyListener.KEY_3 = 51;
KeyListener.KEY_4 = 52;
KeyListener.KEY_5 = 53;
KeyListener.KEY_6 = 54;
KeyListener.KEY_7 = 55;
KeyListener.KEY_8 = 56;
KeyListener.KEY_9 = 57;
KeyListener.KEY_0 = 58;
KeyListener.KEY_A = 65;
KeyListener.KEY_B = 66;
KeyListener.KEY_C = 67;
KeyListener.KEY_D = 68;
KeyListener.KEY_E = 69;
KeyListener.KEY_F = 70;
KeyListener.KEY_G = 71;
KeyListener.KEY_H = 72;
KeyListener.KEY_I = 73;
KeyListener.KEY_J = 74;
KeyListener.KEY_K = 75;
KeyListener.KEY_L = 76;
KeyListener.KEY_M = 77;
KeyListener.KEY_N = 78;
KeyListener.KEY_O = 79;
KeyListener.KEY_P = 80;
KeyListener.KEY_Q = 81;
KeyListener.KEY_R = 82;
KeyListener.KEY_S = 83;
KeyListener.KEY_T = 84;
KeyListener.KEY_U = 85;
KeyListener.KEY_V = 86;
KeyListener.KEY_W = 87;
KeyListener.KEY_X = 88;
KeyListener.KEY_Y = 89;
KeyListener.KEY_Z = 90;
console.log("Javascript is working!");
window.addEventListener('load', () => {
    console.log("Handling the Load event");
    const game = new Game(document.getElementById('canvas'));
});
class Game {
    constructor(canvas) {
        this.step = () => {
            const leftLane = this.canvas.width / 4;
            const middleLane = this.canvas.width / 2;
            const rightLane = this.canvas.width / 4 * 3;
            if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) && this.playerPositionX !== leftLane) {
                this.playerPositionX = leftLane;
            }
            if (this.keyListener.isKeyDown(KeyListener.KEY_UP) && this.playerPositionX !== middleLane) {
                this.playerPositionX = middleLane;
            }
            if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) && this.playerPositionX !== rightLane) {
                this.playerPositionX = rightLane;
            }
            this.trophyPositionY += this.trophySpeed;
            if (this.playerPositionX < this.trophyPositionX + this.trophyImage.width
                && this.playerPositionX + this.playerImage.width > this.trophyPositionX
                && this.canvas.height - 150 < this.trophyPositionY + this.trophyImage.height
                && this.canvas.height - 150 + this.playerImage.height > this.trophyPositionY) {
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
            if (this.trophyPositionY + this.trophyImage.height > this.canvas.height) {
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
            const ctx = this.canvas.getContext('2d');
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.writeTextToCanvas(ctx, "UP arrow = middle | LEFT arrow = left | RIGHT arrow = right", this.canvas.width / 2, 40, 14);
            ctx.drawImage(this.playerImage, this.playerPositionX - this.playerImage.width / 2, this.canvas.height - 150);
            ctx.drawImage(this.trophyImage, this.trophyPositionX - this.trophyImage.width / 2, this.trophyPositionY);
            requestAnimationFrame(this.step);
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth / 3;
        this.canvas.height = window.innerHeight;
        this.keyListener = new KeyListener();
        this.trophyImage = this.loadNewImage("assets/img/objects/gold_trophy.png");
        this.trophyPositionX = this.canvas.width / 2;
        this.trophyPositionY = 60;
        this.trophySpeed = 5;
        this.playerImage = this.loadNewImage("./assets/img/players/character_robot_walk0.png");
        this.playerPositionX = this.canvas.width / 2;
        console.log('start animation');
        requestAnimationFrame(this.step);
    }
    writeTextToCanvas(ctx, text, xCoordinate, yCoordinate, fontSize = 20, color = "red", alignment = "center") {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
//# sourceMappingURL=app.js.map