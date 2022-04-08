var currentPlayer = "X";
var gameDIsplay = document.getElementById("player");
var gameFields = document.getElementsByClassName("filed");
var gameActive = true;
var gameState = ["", "", "", "", "", "", "", "", ""];
var gameScore = {
  x: 0,
  o: 0,
};

var gameRules = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

gameDIsplay.innerHTML = playerTurn();

for (var i = 0; i < gameFields.length; i++) {
  var element = gameFields[i];
  element.setAttribute("data-index", i);
  element.addEventListener("click", gameFieldClicked);
}

function checkGameRules() {
  for (var i = 0; i < gameRules.length; i++) {
    var rule = gameRules[i];
    var a = gameState[rule[0]];
    var b = gameState[rule[1]];
    var c = gameState[rule[2]];
    if (a == "" || b == "" || c == "") {
      continue;
    }
    if (a == b && b == c) {
      gameActive = false;
      gameDIsplay.innerHTML = winMessage();
      gameScore[currentPlayer]=gameScore[currentPlayer] +1;
      return;
    }
  }
  var isDraw = !gameState.includes("");
  if (isDraw) {
    gameActive = false;
    gameDIsplay.innerHTML = drawMessage();
    return;
  }

  changePlayer();
}

function gameFieldClicked(event) {
  var selectedField = event.target;
  var selectedIndex = parseInt(selectedField.getAttribute("data-index"));

  if (gameState[selectedIndex] !== "" || !gameActive) {
    return;
  }
  updateGameState(selectedField, selectedIndex);
  checkGameRules();
}

function updateGameState(selectedField, index) {
  gameState[index] = currentPlayer;

  selectedField.innerHTML = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  gameDIsplay.innerHTML = playerTurn();
}

function playerTurn() {
  return `Player ${currentPlayer} je na potezu`;
}

function winMessage() {
  return `Player ${currentPlayer} je pobijedio...`;
}

function drawMessage() {
  return `Neriješeno je, igra je gotova...`;
}

function restart() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  gameDIsplay.innerHTML = playerTurn();
  for (var field of gameFields) {
    field.innerHTML = "";
  }
}
