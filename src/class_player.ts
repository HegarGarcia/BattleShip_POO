import Board from './class_board.js';
import Boat from './class_boat.js';
import { Coords, BoatConstructor } from './interfaces';

export default class Player {

    private boats: any;
    private opponentBoard: Board;
    private board: Board;

    constructor() {
        this.boats = new Map<string, Boat>([
            ['carrier', new Boat({len: 5, name: 'carrier', direction: ''})],
            ['battleship', new Boat({len: 4, name: 'battleship', direction: ''})],
            ['cruiser',new Boat({len: 3, name: 'cruiser', direction: ''})],
            ['submarine', new Boat({len: 3, name: 'submarine', direction: ''})],
            ['destroyer', new Boat({len: 2, name: 'destroyer', direction: ''})]
        ]);
        
        this.opponentBoard = new Board();
        this.board = new Board();
    }

    shot({x, y}:Coords, player:Player) {
        if (!(player instanceof Player)) throw new Error('No es jugador válido');

        
    }

    putBoat({x, y, direction, name}: BoatConstructor) {
        this.board
    }

    checkLose() {
        return this.boats.every((boat: Boat) => boat)
    }
}

// let global = window;

// global.Player = Player;
// global.Board = Board;