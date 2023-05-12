import { PlayLayout } from "../layout/PlayLayout.js";
import { State } from "./State.js";
import { Level } from "../../levels/Level.js";
import { LevelsManager } from "../../levels/LevelsManager.js";
import { KeyHandler } from "../handler/KeyHandler.js";
export class PlayState extends State {
    constructor(game) {
        super(game);
        this.layout = new PlayLayout(this.game);
        this.levelsManager = new LevelsManager(new Level(this.game, "Level 1", "getLevelDescription(1)"));
        this.keyHandler = new KeyHandler();
    }
    toPause() {
        this.game.setCurrentState("Pause");
    }
    render(){
        this.layout.draw();
    }
    nextLevel(){
        this.levelsManager.nextLevel();
    }
    previousLevel(){
        this.levelsManager.previousLevel();
    }
    goToLevel(number){
        this.levelsManager.goToLevel(number);
    }
    getLevelDescription(number){

    }
    enter() {
        super.enter();
        this.addCallbacks();
    }
  
    exit() {
        super.exit();
        this.keyHandler.removeAllCallbacks();
    }
    addCallbacks() {
    }

}
