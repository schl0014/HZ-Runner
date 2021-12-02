import GameLoop from './GameLoop.js';
import HighscoreScene from './HighscoreScene .js';
import Level1 from './Level1.js';
import Level2 from './level2.js';
import Level3 from './Level3.js';
export default class Game {
    gameloop;
    isFinished;
    levels;
    highScoreScene;
    currentlevel;
    scene;
    constructor(canvas) {
        this.highScoreScene = new HighscoreScene(canvas);
        this.isFinished = false;
        this.currentlevel = 0;
        this.levels = [new Level1(canvas),
            new Level2(canvas),
            new Level3(canvas)];
        console.log('start animation');
        this.gameloop = new GameLoop(this);
        this.gameloop.start();
    }
    update(elapsed) {
        if (this.levels[this.currentlevel].isCompleted()) {
            this.currentlevel += 1;
        }
        if (this.levels[this.currentlevel].score < 0) {
            this.highScoreScene.render();
            this.isFinished = true;
            if (this.currentlevel >= this.levels.length) {
                if (this.levels[this.currentlevel].isCompleted()) {
                    this.highScoreScene.render();
                    console.log('test');
                    this.isFinished = true;
                }
            }
        }
        return this.levels[this.currentlevel].update(elapsed, this.gameloop.frameCount);
    }
    processInput() {
        this.levels[this.currentlevel].processInput();
    }
    render() {
        if (this.isFinished === false) {
            this.levels[this.currentlevel].render();
        }
    }
}
//# sourceMappingURL=Game.js.map