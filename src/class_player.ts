import Board from "./class_board.js";
import Boat from "./class_boat.js";
import Shot from "./class_shot.js";
import { EventEmitter } from "./event_emitter.js";
import { IBoat, ICell, ICoords, ITurn } from "./interfaces";

export default class Player {

    private cpu: boolean;
    private boats: Map<string, Boat>;
    private board: Board;
    private opponentBoard: Board;
    private mediator: EventEmitter;

    constructor(mediator, cpu = false) {
        this.cpu = cpu;
        this.boats = new Map<string, Boat>([
            ["carrier", new Boat({len: 5, name: "carrier"})],
            ["battleship", new Boat({len: 4, name: "battleship"})],
            ["cruiser", new Boat({len: 3, name: "cruiser"})],
            ["submarine", new Boat({len: 3, name: "submarine"})],
            ["destroyer", new Boat({len: 2, name: "destroyer"})],
        ]);

        this.opponentBoard = new Board(true);
        this.board = new Board();
        this.mediator = mediator;
    }

    public putBoat(boatName: IBoat["name"], {x, y, direction}: ICoords): void {
        if (this.boats.has(boatName) === false) {
            throw new Error("Barco no existe");
        }

        const boat: Boat = this.boats.get(boatName);
        try {
            this.board.setBoat(boatName, {x, y, direction}, boat.getLength());
        } catch (e) {
            throw e;
        }

        const info: ITurn = {
            action: "putBoat",
            isCpu: this.cpu,
            opponentLost: false,
            player: this,
        };

        this.mediator.emit("end-turn", info);
    }

    public shot(coords: ICoords, opponent: Player): void {
        if (!(opponent instanceof Player)) {
            throw new Error("Oponente no es un Jugador Válido");
        }

        let shot: Shot;
        let boat: Boat;
        const target: ICell = opponent.board.getCell(coords);

        if (target.shot === null) {
            if (target.boat === null) {
                shot = new Shot(coords, false);
            } else {
                shot = new Shot(coords, true);
                boat = opponent.getBoat(target.boat);
                boat.reduceHealth();
            }

            this.opponentBoard.setShot(shot, coords);
            opponent.board.setShot(shot, coords);
        }

        const info: ITurn = {
            action: "shot",
            isCpu: this.cpu,
            opponentLost: opponent.checkLost(),
            player: this,
            shot: {
                hitted: shot.hitted(),
                isAlive: target.boat === null ? true : boat.isAlive(),
            },
        };

        this.mediator.emit("end-turn", info);
    }

    public getBoat(name: string) {
        return this.boats.has(name) ? this.boats.get(name) : null;
    }

    public printBoards() {
        this.opponentBoard.print();
        this.board.print();
    }

    private checkLost(): boolean {
        return !Array.from(this.boats.values()).some((boat: Boat) => boat.isAlive());
    }
}
