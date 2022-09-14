const Player = (name) => {
  const getName = () => name;
  return { getName };
};

const Gameboard = (() => {
  let _boardArr = [null, null, null, null, null, null, null, null, null];

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return { _boardArr };
})();

const displayController = (() => {
  const _gameplayClickHandler = () => {
    const gameboardContainer = document.querySelector(".gameboard");

    gameboardContainer.onclick = (event) => {
      const square = event.target;
      const squareIndex = square.dataset.index;

      if (!square.classList.contains("sq")) return;
      if (!Game.checkForValidMove(squareIndex)) return;
      document.querySelector(`.sq[data-index="${squareIndex}"]`).textContent =
        currentMarker;

      Gameboard._boardArr.splice(square.dataset.index, 1, currentMarker);
      console.log(Gameboard._boardArr);
      Game.switchMarkers();
    };
  };

  const playerNameModalClickHandler = () => {
    const nameModal = document.querySelector(".player-modal.name");
    const gameContainer = document.querySelector(".game-container");
    const playBtn = document.querySelector(".play");

    playBtn.onclick = () => {
      const player1Name = document.querySelector("#player-1").value;
      const player2Name = document.querySelector("#player-2").value;
      const playerX = document.querySelector(".player-x");
      const playerO = document.querySelector(".player-o");

      const player1 = Player(player1Name);
      const player2 = Player(player2Name);

      playerX.textContent = player1.getName();
      playerO.textContent = player2.getName();

      nameModal.style.visibility = "hidden";
      gameContainer.style.visibility = "visible";
    };
  };

  return {
    click: _gameplayClickHandler,
    play: playerNameModalClickHandler,
  };
})();

const Game = (() => {
	currentMarker = "X";

  const checkForValidMove = (ArrIndex) => {
    return Gameboard._boardArr[ArrIndex] === null ? true : false;
  };

  const switchMarkers = () => {
    if (currentMarker === "X") {
      currentMarker = "O";
    } else {
      currentMarker = "X";
    }
  };

  displayController.click();
  displayController.play();

  return { checkForValidMove, switchMarkers };
})();
