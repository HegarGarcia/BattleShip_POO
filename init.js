(async function () {
    game = new BattleShip();
    p1 = await game.start();
    cpu = game.cpu;

    p1.putBoat("carrier", {x: 0, y: 0, direction: {x: 1}});
    p1.putBoat("battleship", {x: 0, y: 1, direction: {x: 1}});
    p1.putBoat("cruiser", {x: 0, y: 2, direction: {x: 1}});
    p1.putBoat("submarine", {x: 0, y: 3, direction: {x: 1}});
    p1.putBoat("destroyer", {x: 0, y: 4, direction: {x: 1}});

    p1.shot("carrier", {x: 3, y: 2, direction: {y: -1}});
    p1.shot("battleship", {x: 3, y: 7, direction: {x: -1}});
    p1.shot("submarine", {x: 4, y: 6, direction: {x: 1}});
    p1.shot("destroyer", {x: 6, y: 4, direction: {y: -1}});
    p1.shot("cruiser", {x: 6, y: 3, direction: {x: 1}});
})()