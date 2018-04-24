import { BoatConstructor } from './interfaces';

export default class Boat {
    
    length:Number;
    health:Number;
    name:String;

    constructor({len, name, direction}:BoatConstructor) {
        this.length = this.health = len;
        this.name = name;
    }

    setBoat() {
        
    }

    isAlive() {
        return this.health > 0;
    }
}