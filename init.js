(async function () {
    game = new BattleShip();
    p1 = await game.start();
    cpu = game.cpu;

    cpu.board.print();
    p1.shot({x: 3, y: 2}, cpu);
    p1.shot({x: 0, y: 0}, cpu);
    cpu.board.print();
})()