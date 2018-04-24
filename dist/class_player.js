import Board from './class_board.js';
import Boat from './class_boat.js';
export default class Player {
    constructor() {
        this.boats = new Map([
            ['carrier', new Boat({ len: 5, name: 'carrier', direction: '' })],
            ['battleship', new Boat({ len: 4, name: 'battleship', direction: '' })],
            ['cruiser', new Boat({ len: 3, name: 'cruiser', direction: '' })],
            ['submarine', new Boat({ len: 3, name: 'submarine', direction: '' })],
            ['destroyer', new Boat({ len: 2, name: 'destroyer', direction: '' })]
        ]);
        this.opponentBoard = new Board();
        this.board = new Board();
    }
    shot({ x, y }, player) {
        if (!(player instanceof Player))
            throw new Error('No es jugador válido');
    }
    putBoat({ x, y, direction, name }) {
        this.board;
    }
    checkLose() {
        return this.boats.every((boat) => boat);
    }
}
