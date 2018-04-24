export default class Board {
    constructor() {
        let props = {length: 10};
        let row = Array.from(props).fill({boat: false, shot: false});
        this.board = Array.from(props).fill(row);
    }
}