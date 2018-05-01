import Player from "./class_player.js";
import { EventEmitter } from "./event_emitter.js";

class BattleShip {
    private mediator: EventEmitter;
    private player: Player;
    private cpu: Player;

    constructor() {
        this.mediator = new EventEmitter();

        // this.mediator.on("end-turn", (data) => data.lost === false ? null : this.end());
    }

    public start(): Player {
        this.player = new Player(this.mediator);
        this.cpu = new Player(this.mediator);

        this.cpu.putBoat("carrier", {x: 0, y: 0, direction: {x: 1}});

        return this.player;
    }

}

window["BattleShip"] = BattleShip;
