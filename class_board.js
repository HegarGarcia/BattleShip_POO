export default class Board {
    constructor() {
        let props = {length: 10};
        let row = Array.from(props);
        this.board = Array.from(props).fill(row);
    }
}