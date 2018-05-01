import Player from "./class_player.js";
import { EventEmitter } from "./event_emitter.js";

class BattleShip {
    private mediator: EventEmitter;
    private player: Player;
    private cpu: Player;

    constructor() {
        this.mediator = new EventEmitter();
    }

    public start(): Player {
        this.player = new Player(this.mediator);
        this.cpu = new Player(this.mediator);
        this.mediator.emit("hola", null);
        return this.player;
    }
}

// window["BattleShip"] = BattleShip;
