import Player from "./class_player.js";
import { EventEmitter } from "./event_emitter.js";

class BattleShip {
    private mediator: EventEmitter;
    private player: Player;
    private cpu: Player;

    constructor() {
        this.mediator = new EventEmitter();
        this.mediator.on("end-turn", (data) => console.log(data));
    }

    public async start(): Promise<Player> {
        this.player = new Player(this.mediator);
        this.cpu = new Player(this.mediator);

        await this.cpu.putBoat("carrier", {x: 3, y: 2, direction: {y: -1}});
        await this.cpu.putBoat("battleship", {x: 3, y: 7, direction: {x: -1}});
        await this.cpu.putBoat("submarine", {x: 4, y: 6, direction: {x: 1}});
        await this.cpu.putBoat("destroyer", {x: 6, y: 4, direction: {y: -1}});
        await this.cpu.putBoat("cruiser", {x: 6, y: 3, direction: {x: 1}});

        return this.player;
    }

}

window["BattleShip"] = BattleShip;
