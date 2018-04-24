export default class Boat {
    constructor({ len, name, direction }) {
        this.length = this.health = len;
        this.name = name;
    }
    setBoat() {
    }
    isAlive() {
        return this.health > 0;
    }
}
