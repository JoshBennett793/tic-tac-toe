const Game = (() => {
	const winningCombos = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6],
	];

})();

const displayController = (() => {
  "use strict";
  const selection = prompt("X?");

  let _boardArr = [null, null, null, null, null, null, null, null, null];

  const _clickHandler = () => {
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

  return {
    click: _clickHandler,
  };
})();

displayController.click();

const player = () => {
	const player1 = document.querySelector("#player-1").value;
	const player2 = document.querySelector("#player-2").value;

  const getName = () => name;
  return { getName };
};

