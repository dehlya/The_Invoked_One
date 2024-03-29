import { CharacterState } from "./CharacterState.js";
import { CharacterIdleState } from "./CharacterIdleState.js";
import { CharacterAttackState } from "./CharacterAttackState.js";
import { CharacterHitState } from "./CharacterHitState.js";
import { CharacterBlockingState } from "./CharacterBlockingState.js";
import { CharacterDashingState } from "./CharacterDashingState.js";
import { CharacterDeadState } from "./CharacterDeadState.js"
import { CharacterHealingState } from "./CharacterHealingState.js";

export class CharacterMovingState extends CharacterState{

    constructor(character) {
        super(character);
        this.character = character;
    }

    stop() {
        this.character.setState(new CharacterIdleState(this.character));
        //stop moving animation
        this.character.stopMoveAnimation();
    }
    attack() {
        this.character.looseStamina(20);
        this.character.setState(new CharacterAttackState(this.character));
        //Trigger attack animation
        this.character.startAttackAnimation();
    }
    blockOn() {
        this.character.setState(new CharacterBlockingState(this.character));
        //Stop moving animation and start block animation
    }
    dash() {
        this.character.looseStamina(20);
        console.log("character is dashing !");
        this.character.setState(new CharacterDashingState(this.character));
        this.character.dashAnimation();
        //Stop moving animation and start dash animation
    }

    hit(value) {
        this.character.looseHP(value);
        if(this.character.getHealth() <= 0){
            this.character.setState(new CharacterDeadState(this.character));
            //Stop moving and trigger death animation
        }
        else{
            this.character.setState(new CharacterHitState(this.character));
            this.character.hitAnimation();
            //Stop moving and trigger hit animation
        }
    }
    heal() {
        this.character.setState(new CharacterHealingState(this.character));
        this.character.usePotion();
        this.character.healAnimation();
    }
}