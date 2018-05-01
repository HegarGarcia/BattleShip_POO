import { IBoat } from "./interfaces";

export default class Boat {

    private name: string;
    private length: 2 | 3 | 4 | 5;
    private health: number;

    constructor({len, name}: IBoat) {
        this.length = this.health = len;
        this.name = name;
    }

    public reduceHealth(): boolean {
        this.health--;
        return this.isAlive();
    }

    public getLength(): 2 | 3 | 4 | 5 {
        return this.length;
    }

    public isAlive(): boolean {
        return this.health > 0;
    }
}
