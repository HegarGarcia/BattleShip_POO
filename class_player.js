import Board from './class_board.js';
import Boat from './class_boat.js';

class Player {
    constructor() {
        this.boats = {
            'carrier': new Boat({len: 5, name: 'carrier'}),
            'battleship': new Boat({len: 4, name: 'battleship'}),
            'cruiser': new Boat({len: 3, name: 'cruiser'}),
            'submarine': new Boat({len: 3, name: 'submarine'}),
            'destroyer': new Boat({len: 2, name: 'destroyer'})
        };
        
        this.opponentBoard = new Board();
        this._board = new Board();
    }

    shot({x, y}, player) {
        if (!(player instanceof Player)) throw new Error('No es jugador válido');

        let spot = player._board.board[x][y];

        if (spot.boat !== false && spot.shot === false) {
            player.boats[spot.boat].health--;
            spot.shot = true;
        }
    }
}

let global = window || global;

global.Player = Player;
global.Board = Board;