let gameInfo = document.querySelector(".game-info");
let boxes = document.querySelectorAll(".box");
let newBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

//winning position;
let winingPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//function to inilisize the game..
function intiGame() {
  currentPlayer = "X";
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  //UI par empty krna h
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";

    //remove bg color
    box.classList = `box box${index + 1}`;
  });

  newBtn.classList.remove("active");
}
intiGame();

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  //UI update
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";

  winingPositions.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check winner is X
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      //unable poitnerevent
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  //it means we have a winner
  if (answer !== "") {
    gameInfo.innerText = `Winner - ${answer}`;
    newBtn.classList.add("active");
  }

  //when game is tie
  let fillcount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      fillcount++;
    }
  });

  if (fillcount === 9) {
    gameInfo.innerText = `Game tie`;
    newBtn.classList.add("active");
  }
}
function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerHTML = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    //swap kro turn ko
    swapTurn();

    //check kro koi jeeta ya nhi
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newBtn.addEventListener("click", intiGame);
