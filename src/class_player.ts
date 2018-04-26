import Board from './class_board.js';
import Boat from './class_boat.js';
import { Coords, BoatConstructor } from './interfaces';

export default class Player {

    private boats: any;
    private opponentBoard: Board;
    private board: Board;

    constructor() {
        this.boats = new Map<string, Boat>([
            ['carrier', new Boat({len: 5, name: 'carrier'})],
            ['battleship', new Boat({len: 4, name: 'battleship'})],
            ['cruiser',new Boat({len: 3, name: 'cruiser'})],
            ['submarine', new Boat({len: 3, name: 'submarine'})],
            ['destroyer', new Boat({len: 2, name: 'destroyer'})]
        ]);
        
        this.opponentBoard = new Board();
        this.board = new Board();
    }

    putBoat({x, y, direction, name}: BoatConstructor) {
        this.board.addBoat({x, y, direction, name});
    }

    shot({x, y}:Coords, player:Player) {
        if (!(player instanceof Player)) throw new Error('No es jugador válido');

        
    }

    
    checkLose() {
        return this.boats.every((boat: Boat) => boat.isAlive());
    }
}

// let global = window;

// global.Player = Player;
// global.Board = Board;