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
  ("use strict");

  const _gameplayClickHandler = () => {
    const gameboardContainer = document.querySelector(".gameboard");

    gameboardContainer.addEventListener("click", (event) => {
      const square = event.target;
      const squareIndex = square.dataset.index;
      if (square.classList.contains("sq")) {
        if (Game.checkForValidMove(squareIndex))
          document.querySelector(
            `.sq[data-index="${squareIndex}"]`
          ).textContent = Game.Marker.current;
					// implement logic that prevents user from playing in spots that are already taken
        Game.switchMarkers();
      }
    });
  };

  // if (square.textContent === "") {
  //   if (selection) {
  //     square.textContent = "X";
  //     _boardArr.splice(square.dataset.index, 1, "X");
  //   } else {
  //     square.textContent = "O";
  //     _boardArr.splice(square.dataset.index, 1, "O");
  //   }

  const nameModal = document.querySelector(".player-modal.name");
  const gameContainer = document.querySelector(".game-container");

  const playerNameModalClickHandler = () => {
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
    submit: playerNameModalClickHandler,
  };
})();

const Game = (() => {

	const Marker = () => {
		let current = "X";
		return { current };
	}

  const checkForValidMove = (ArrIndex) => {
    return Gameboard._boardArr[ArrIndex] === null ? true : false;
  };

  const switchMarkers = () => {
    if (Marker.current === "X") {
      Marker.current = "O";
    } else {
      Marker.current = "X";
    }
  };

  displayController.click();
  displayController.submit();

  return { Marker, checkForValidMove, switchMarkers };
})();
