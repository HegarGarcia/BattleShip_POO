import Player from "./class_player.js";
import { EventEmitter } from "./event_emitter.js";
import { ITurn } from "./interfaces.js";

class BattleShip {
    private mediator: EventEmitter;
    private player: Player;
    private cpu: Player;

    constructor() {
        this.mediator = new EventEmitter();
        this.mediator.on("end-turn", this.handler);
    }

    public async start(): Promise<Player> {
        this.player = new Player(this.mediator);
        this.cpu = new Player(this.mediator, true);

        this.cpu.putBoat("carrier", {x: 3, y: 2, direction: {y: -1}});
        this.cpu.putBoat("battleship", {x: 3, y: 7, direction: {x: -1}});
        this.cpu.putBoat("submarine", {x: 4, y: 6, direction: {x: 1}});
        this.cpu.putBoat("destroyer", {x: 6, y: 4, direction: {y: -1}});
        this.cpu.putBoat("cruiser", {x: 6, y: 3, direction: {x: 1}});

        this.player.printBoards();

        return this.player;
    }

    private handler(data: ITurn): void {
        if (data.isCpu === true) {
            return;
        }

        if (data.opponentLost === false) {
            console.clear();
            switch (data.action) {
                case "putBoat":
                    console.log("Barco puesto");
                    break;
                case "shot":
                    console.log(`El disparo ${data.shot.hitted ? "dió" : "no dió"}`);
                    if (!data.shot.isAlive) {
                        console.log("Barco hundido");
                    }
                default:
                    break;
            }
            data.player.printBoards();
            return;
        }
        console.clear();
        console.log("Felicidades has ganado!");
    }
}

window["BattleShip"] = BattleShip;
