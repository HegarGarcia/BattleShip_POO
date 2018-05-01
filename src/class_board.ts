import Shot from "./class_shot";
import { ICell, ICoords } from "./interfaces";

type BoatLength = 1 | 2 | 3 | 4 | 5 ;

export default class Board {

    private board: ICell[][];
    private boatCount: Set<string>;

    public constructor() {
        const props = {length: 10};
        const cell: ICell = {boat: null, shot: null};
        const row = () => Array.from(props).map(() => Object.assign({}, cell));
        this.board = Array.from(props).map(row);
        this.boatCount = new Set();
    }

    public getCell({x, y}: ICoords): ICell {
        return this.board[y][x];
    }

    public setBoat(boatName: string, {x, y, direction = {x: 1}}: ICoords, length: BoatLength): void {
        if (this.boatCount.size > 5 || this.boatCount.has(boatName) !== false) {
            throw new Error("Barco(s) ya ubicado(s)");
        }

        const valid = this.checkValid({x, y, direction}, length);

        if (valid !== true) {
            throw new Error("Rango no válido");
        }

        let start: number;
        let end: number;

        if (direction.x) {
            [ start, end ] = direction.x === 1 ? [x, x + length] : [x - length + 1, x + 1];

            this.board[y] = this.board[y].reduce((arr: ICell[], curr: ICell, i: number) => {
                if (i >= start && i < end) {
                    curr.boat = boatName;
                }
                arr.push(curr);
                return arr;
            }, []);
        } else if (direction.y) {
            [ start, end ] = direction.y === 1 ? [y - length, y] : [y, y + length];

            this.board = this.board.reduce((arr: ICell[][], row: ICell[], i: number) => {
                if (i >= start && i < end) {
                    row[x].boat = boatName;
                }
                arr.push(row);
                return arr;
            }, []);
        }

        this.boatCount.add(boatName);
    }

    public setShot(shot: Shot, {x, y}: ICoords): void {
        const valid = this.checkValid({x, y}, 1, true);

        if (valid !== true) {
            throw new Error("Tiro ya disparado");
        }

        this.board[y][x].shot = shot;
    }

    public print() {
        const tempBoard = this.board.map((row) => row.map((cell) => {
            return cell.boat === null && cell.shot === null ? null : cell.boat !== null && cell.shot !== null ? "±" :
            cell.boat === null && cell.shot !== null ? "*" : "«";
        }));
        console.table(tempBoard);
    }

    private checkValid({ x, y, direction = {x: 1}}: ICoords, length: BoatLength = 1, checkShot: boolean = false):
    boolean {
        let range: ICell[];
        let start: number;
        let end: number;

        if (direction.x) {
            [ start, end ] = direction.x === 1 ? [x, x + length] : [x - length + 1, x + 1];

            range = this.getRow(y).slice(start, end);
        } else if (direction.y) {
            [ start, end ] = direction.y === 1 ? [y - length, y] : [y, y + length];

            range = this.getColumn(x).slice(start, end);
        } else {
            range = [this.board[x][y]];
        }

        if (range.length !== length) {
            return false;
        }

        const valid = range.every((cell: ICell) => checkShot === false ? cell.boat === null : cell.shot === null);

        if (valid !== true) {
            return false;
        }

        return true;
    }

    private getRow(i: number): ICell[] {
        return this.board[i];
    }

    private getColumn(i: number): ICell[] {
        return this.board.map((row) => row[i]);
    }
}
