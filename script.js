const TicTacToe = (function () {
  const Player = (name) => {
    const getName = () => name;
    return { getName };
  };

  const Gameboard = (() => {
    let boardArr = [null, null, null, null, null, null, null, null, null];

		const resetArr = () => {
			for (let i = 0; i < boardArr.length; i++) {
        boardArr[i] = null;
      }
		}

    return { boardArr, resetArr };
  })();

  const displayController = (() => {
    const _Gameplay = (event) => {
      const square = event.target;
      const squareIndex = square.dataset.index;

      if (!square.classList.contains("sq")) return;
      if (!Game.checkForValidMove(squareIndex)) return;

      document.querySelector(`.sq[data-index="${squareIndex}"]`).textContent =
        Game.Marker.current;
      Gameboard.boardArr.splice(square.dataset.index, 1, Game.Marker.current);
      Game.checkForWinner();
      Game.checkForTie();
      Game.switchMarkers();
    };

    const gameboardContainer = document.querySelector(".gameboard");

    const attachGameplay = () => {
      gameboardContainer.addEventListener("click", _Gameplay);
    };

    const X = document.querySelector(".x");
    const O = document.querySelector(".o");

    const displayWinner = () => {
      if (Game.Marker.current === "X") {
        X.textContent = "Winner";
        O.textContent = "Loser";
      } else {
        O.textContent = "Winner";
        X.textContent = "Loser";
      }
      gameboardContainer.removeEventListener("click", _Gameplay);
    };

    const displayTie = () => {
      X.textContent = "Tie";
      O.textContent = "Game";
      gameboardContainer.removeEventListener("click", _Gameplay);
    };

    const resetGame = () => {
      const gridSquares = document.querySelectorAll(".sq");
      Gameboard.resetArr();
      Game.Marker.current = "X";
      X.textContent = "X";
      O.textContent = "O";
      gameboardContainer.addEventListener("click", _Gameplay);
      gridSquares.forEach((square) => {
        square.textContent = "";
      });
    };

    const _playEvent = (event) => {
      event.preventDefault(); // prevents refreshing upon form submission
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
      const nameForm = document.querySelector(".name-form");
      nameForm.addEventListener("submit", _playEvent);
      nameForm.reset();
    };

    return {
      click: attachGameplay,
      play: attachPlayEvent,
      displayWinner: displayWinner,
      displayTie: displayTie,
      resetGame: resetGame,
    };
  })();

  const Game = (() => {
    const Marker = (() => {
      let current = "X";
      return { current };
    })();

    const checkForValidMove = (ArrIndex) => {
      return Gameboard.boardArr[ArrIndex] === null;
    };

    const switchMarkers = () => {
      if (Marker.current === "X") {
        Marker.current = "O";
      } else {
        Marker.current = "X";
      }
    };

    const checkForWinner = () => {
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

      /* returns true if find() method returns an array from 
		winConditions in which every index of that array matches 
		with the same index of the boardArr that contain the same marker, 
		if no matches found, find() method returns undefined, which returns false
		*/
      if (
        winConditions.find((condition) =>
          condition.every(
            (index) => Gameboard.boardArr[index] === Marker.current
          )
        ) != undefined
      ) {
        displayController.displayWinner();
      }
    };

    const checkForTie = () => {
      if (!Gameboard.boardArr.includes(null)) {
        displayController.displayTie();
      }
    };

    const restartGame = () => {
      displayController.resetGame();
    };

    const attachRestartHandler = () => {
      const restartBtn = document.querySelector(".restart");
      restartBtn.addEventListener("click", restartGame);
    };

    displayController.click();
    displayController.play();
    attachRestartHandler();

    return {
      checkForValidMove,
      switchMarkers,
      checkForWinner,
      checkForTie,
      Marker,
    };
  })();
})();
