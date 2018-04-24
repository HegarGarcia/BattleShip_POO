import { Coords } from './interfaces';

export default class Board {

    private board:Object[][]

    public constructor() {
        let props = {length: 10};
        let cell = {boat: false, shot: false};
        let row = () => Array.from(props).map(() => Object.assign({}, cell));
        this.board = Array.from(props).map(row);
    }

    public addBoat() {

    }

    public checkFree() {

    }
}