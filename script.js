const Game = (() => {
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
})();

const displayController = (() => {
  "use strict";
  // const selection = prompt("X?");

  let _boardArr = [null, null, null, null, null, null, null, null, null];

  const _gameplayClickHandler = () => {
    const gameboardContainer = document.querySelector(".gameboard");
    // didn't need this for array splice, will keep it here just in case
    const gridSquares = [...document.querySelectorAll(".sq")];
    gameboardContainer.addEventListener("click", (event) => {
      const square = event.target;
      if (square.classList.contains("sq")) {
        if (square.textContent === "") {
          if (selection) {
            square.textContent = "X";
            _boardArr.splice(square.dataset.index, 1, "X");
          } else {
            square.textContent = "O";
            _boardArr.splice(square.dataset.index, 1, "O");
          }
        }
      }
    });
  };

  const _playerNameClickHandler = () => {
    const submitBtn = document.querySelector(".submit");
    const nameModal = document.querySelector(".player-modal.name");
		const selectionModal = document.querySelector(".player-modal.selection");
    const player1DOMElements = document.querySelectorAll(".player-1-name");
    const player2DOMElement = document.querySelector(".player-2-name");
		
    submitBtn.addEventListener("click", () => {
			const player1Name = document.querySelector("#player-1").value;
			const player2Name = document.querySelector("#player-2").value;
      player1DOMElements.forEach((el) => {
        el.textContent = "";
        el.textContent = player1Name;
      });
      player2DOMElement.textContent = "";
      player2DOMElement.textContent = player2Name;

      nameModal.style.visibility = "hidden";
			selectionModal.style.visibility = "visible";
    });
  };

  return {
    click: _gameplayClickHandler,
    names: _playerNameClickHandler,
  };
})();

displayController.click();
displayController.names();
