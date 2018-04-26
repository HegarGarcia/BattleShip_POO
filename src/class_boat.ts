import { BoatConstructor } from './interfaces';

export default class Boat {
    
    private length: Number;
    private health: Number;
    private name: String;

    constructor({len, name, direction}: BoatConstructor) {
        this.length = this.health = len;
        this.name = name;
    }

    isAlive() {
        return this.health > 0;
    }
}