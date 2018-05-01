import Shot from "./class_shot";
import { ICell, ICoords } from "./interfaces";

export default class Board {

    private board: ICell[][];

    public constructor() {
        const props = {length: 10};
        const cell: ICell = {boat: null, shot: null};
        const row = () => Array.from(props).map(() => Object.assign({}, cell));
        this.board = Array.from(props).map(row);
    }

    public getBoat({x, y}: ICoords): null | string {
        return this.board[y][x].boat;
    }

    public async setBoat(boatName: string, {x, y, direction = {x: 1}}: ICoords, length: 2 | 3 | 4 | 5): Promise<any> {
        return new Promise(async (resolve, reject) => {
            await this.checkValid({x, y, direction}, length).catch((e) => {
                reject(e);
            });

            let start: number;
            let end: number;

            if (direction.x) {
                [ start, end ] = direction.x === 1 ? [x, x + length] : [x - length, x];

                this.board[y] = this.board[y].reduce((arr: ICell[], curr: ICell, i: number) => {
                    if (i > start && i < end) {
                        curr.boat = boatName;
                    }
                    arr.push(curr);
                    return arr;
                }, []);
            } else if (direction.y) {
                [ start, end ] = direction.y === 1 ? [y - length, y] : [y, y + length];

                this.board = this.board.reduce((arr: ICell[][], row: ICell[], i: number) => {
                    if (i > start && i < end) {
                        row[x].boat = boatName;
                    }
                    arr.push(row);
                    return arr;
                }, []);
            }
            resolve(null);
        });
    }

    public async setShot(shot: Shot, {x, y}: ICoords) {
        return new Promise(async (resolve, reject) => {
            await this.checkValid({x, y}, 1).catch((e) => {
                reject(e);
            });
            this.board[y][x].shot = shot;
            resolve(null);
        });
    }

    private checkValid({ x, y, direction = {x: 1}}: ICoords, length: 1 | 2 | 3 | 4 | 5 = 1): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let range: ICell[];
            let start: number;
            let end: number;

            if (direction.x) {
                [ start, end ] = direction.x === 1 ? [x, x + length] : [x - length, x];

                range = this.getRow(y).slice(start, end);
            } else if (direction.y) {
                [ start, end ] = direction.y === 1 ? [y - length, y] : [y, y + length];

                range = this.getColumn(x).slice(start, end);
            } else {
                range = [this.board[x][y]];
            }

            if (range.length !== length) {
                reject(new Error("Rango no válido!"));
            }

            resolve(range.every((cell: ICell) => cell.boat === null));
        });
    }

    private getRow(i: number): ICell[] {
        return this.board[i];
    }

    private getColumn(i: number): ICell[] {
        return this.board.map((row) => row[i]);
    }
}
