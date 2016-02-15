var readline = require("readline");
var Player = require("./shotgun.js");
var AI = require("./ai.js");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

var player;
var ai;

init();

function init() {
    player = new Player("Player");
    ai = new AI(player);
    go();
}


function go() {
  aiMove = ai.nextMove();
  playerMove = getPlayerMove(aiMove);
}

function getPlayerMove(aiMove) {
  rl.question("F(ire), L(oad), or B(lock)?", function(m) {
    switch (m.toLowerCase()) {
      case "l" :
        playerMove = player.load();
        break;
      case "b" :
        playerMove = player.block();
        break;
      case "f":
        playerMove = player.fire();
        break;
      default :
        playerMove = false;
        break;
    }
    if (!playerMove) {
      console.log("Illegal move!")
      return getPlayerMove(aiMove);
    }
    compare(aiMove, playerMove);
  });
}

function compare(aiMove, playerMove) {
  player.printStats();
  ai.printStats();
  // if someone fires, game might end
  if ("f" == aiMove && "f" == playerMove) {
    console.log("Draw!");
    newGame();
  } else if ("f" == aiMove && "b" != playerMove) {
    console.log("You lost!");
    newGame();
  } else if ("f" == playerMove && "b" != aiMove) {
    console.log("You won!");
    newGame();
  } else {
    go();
  }
}

function newGame() {
  rl.question("Do you want to play another round?(y/n) ", function(a) {
    switch (a.toLowerCase()) {
      case "y" :
        player.reset();
        ai.reset();
        go();
        break;
      case "n" :
        process.exit();
        break;
      default :
        newGame();
        break;
    }
  });
}
