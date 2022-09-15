const Player = (name) => {
  const getName = () => name;
  return { getName };
};

const Gameboard = (() => {
  let boardArr = [null, null, null, null, null, null, null, null, null];

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return { boardArr, winConditions };
})();

const displayController = (() => {
  const gameplayClickHandler = () => {
    const gameboardContainer = document.querySelector(".gameboard");

    gameboardContainer.onclick = (event) => {
      const square = event.target;
      const squareIndex = square.dataset.index;

      if (!square.classList.contains("sq")) return;
      if (!Game.checkForValidMove(squareIndex)) return;

      document.querySelector(`.sq[data-index="${squareIndex}"]`).textContent =
        currentMarker;
      Gameboard.boardArr.splice(square.dataset.index, 1, currentMarker);
      Game.switchMarkers(); // this should probably go in the function that checks for a win or not
    };
  };

  const _playEvent = () => {
    const nameModal = document.querySelector(".player-modal.name");
    const gameContainer = document.querySelector(".game-container");
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

  const attachPlayEvent = () => {
    const playBtn = document.querySelector(".play");
    playBtn.onclick = _playEvent;
  };

  return {
    click: gameplayClickHandler,
    play: attachPlayEvent,
  };
})();

const Game = (() => {
  currentMarker = "X";

  const checkForValidMove = (ArrIndex) => {
    return Gameboard.boardArr[ArrIndex] === null ? true : false;
  };

  const switchMarkers = () => {
    if (currentMarker === "X") {
      currentMarker = "O";
    } else {
      currentMarker = "X";
    }
  };

  const checkForWinner = () => {
    return Gameboard.winConditions.find((condition) =>
      condition.every((index) => Gameboard.boardArr[index] === currentMarker)
    );
  };

  displayController.click();
  displayController.play();

  return { checkForValidMove, switchMarkers, checkForWinner };
})();
// Removed underscore from boardArr. Will not be focusing on private variables
