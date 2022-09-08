// const Game = (() => {})();

const displayController = (() => {
  "use strict";

  const selection = prompt("X?");

  // let _boardArr = ["X", "X", null, null, "O", "O", null, null, "O"];

  const _gameboard = () => {
    const gameboardContainer = document.querySelector(".gameboard");
    // use gridSquares to reference the sq dataset index and push to corresponding index in the boardArr
    const gridSquares = [...document.querySelectorAll(".sq")];
    gameboardContainer.addEventListener("click", (event) => {
      const square = event.target;
      if (square.classList.contains("sq")) {
        if (square.textContent === "") {
          if (selection) {
            square.textContent = "X";
          } else {
            square.textContent = "O";
          }
        }
      }
    });
  };

  return {
    click: _gameboard,
  };
})();

displayController.click();

const player = (name) => {
  const getName = () => name;
  return { getName };
};
