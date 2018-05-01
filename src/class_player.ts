import Board from "./class_board.js";
import Boat from "./class_boat.js";
import { EventEmitter } from "./eventemitter.js";
import { IBoat, ICoords } from "./interfaces";

export default class Player {

    private boats: Map<string, Boat>;
    private board: Board;
    private opponentBoard: Board;
    private mediator: EventEmitter;

    constructor(mediator) {
        this.boats = new Map<string, Boat>([
            ["carrier", new Boat({len: 5, name: "carrier"})],
            ["battleship", new Boat({len: 4, name: "battleship"})],
            ["cruiser", new Boat({len: 3, name: "cruiser"})],
            ["submarine", new Boat({len: 3, name: "submarine"})],
            ["destroyer", new Boat({len: 2, name: "destroyer"})],
        ]);

        this.opponentBoard = new Board();
        this.board = new Board();
        this.mediator = mediator;
    }

    public async putBoat(boatName: string, {x, y, direction}: ICoords): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (this.boats.has(boatName) === false) {
                reject(new Error("Barco no existe"));
            }
            const boat: Boat = this.boats.get(boatName);
            await this.board.setBoat(boatName, {x, y, direction}, boat.getLength()).catch((e) => reject(e));
            resolve(null);
        });
    }

    public shot({x, y}: ICoords, opponent: Player): void {

    }
}
