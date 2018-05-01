let game = new BattleShip();
let p1 = game.start();
let cpu = game.cpu;

console.log(p1);
console.log(cpu);
console.table(cpu.board.print());
