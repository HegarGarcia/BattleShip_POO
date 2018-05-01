import Board from "./class_board.js";
import Boat from "./class_boat.js";
import Shot from "./class_shot.js";
import { EventEmitter } from "./event_emitter.js";
import { IBoat, ICell, ICoords } from "./interfaces";

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

    public putBoat(boatName: IBoat["name"], {x, y, direction}: ICoords): Promise<void> {
        if (this.boats.has(boatName) === false) {
            throw new Error("Barco no existe");
        }

        const boat: Boat = this.boats.get(boatName);
        try {
            this.board.setBoat(boatName, {x, y, direction}, boat.getLength());
        } catch (e) {
            console.error(e);
        }

        return Promise.resolve(null);
    }

    public shot(coords: ICoords, opponent: Player): void {
        const target: ICell = opponent.board.getCell(coords);

        if (target.shot === null) {
            const shot: Shot = target.boat === null ? new Shot(coords, false) : new Shot(coords, true);

            Promise.all([this.opponentBoard.setShot(shot, coords), opponent.board.setShot(shot, coords)]);

            if (shot.hitted()) {
                opponent.boats.get(target.boat).reduceHealth();
            }
        }

        this.mediator.emit("end-turn", opponent.checkLost());
    }

    private checkLost(): boolean {
        return !Array.from(this.boats.values()).some((boat: Boat) => boat.isAlive());
    }
}
