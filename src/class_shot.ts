import { ICoords } from "./interfaces";

export default class Shot {

    private x: number;
    private y: number;
    private hit: boolean;

    constructor({x, y}: ICoords, hit: boolean) {
        this.x = x;
        this.y = y;
        this.hit = hit;
    }

    public hitted(): boolean {
        return this.hit;
    }
}
