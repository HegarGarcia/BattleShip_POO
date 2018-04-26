import { Coords } from './interfaces';

export default class Shot {

    private x: Number;
    private y: Number;
    private hit: Boolean;

    constructor({x, y}: Coords, hit: Boolean) {
        this.x = x;
        this.y = y;
        this.hit = hit;
    }

    getState() {
        
    }
}