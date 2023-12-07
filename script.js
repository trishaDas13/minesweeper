// Display/UI

import {
  TILE_STATUSES,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLose,
  // exportTile,
} from "./minesweeper.js";
// let tile;
// let data = exportTile;
// console.log(fetch('minesweeper.js'));


let button = document.querySelectorAll("button");
const boardElement = document.querySelector(".board");
const minesLeftText = document.querySelector("[data-mine-count]");
const messageText = document.querySelector(".subtext");
let rules = document.querySelector('.rules');
let BOARD_SIZE = 0;
let NUMBER_OF_MINES = 0;
let board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);

//todo ---------- for brginer level ----------
button[0].addEventListener("click", (e) => {
   BOARD_SIZE = 10;
   NUMBER_OF_MINES = 10;
  board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);

  rules.style.display = "none";
  button[0].style.display = "none";
  button[1].style.display = "none";
  button[2].style.display = "none";
  messageText.style.display = "block";

  board.forEach((row) => {
    row.forEach((tile) => {
      boardElement.append(tile.element);
      tile.element.addEventListener("click", () => {
        revealTile(board, tile);
        checkGameEnd();
      });
      tile.element.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        markTile(tile);
        listMinesLeft();
      });
    });
  });
  boardElement.style.setProperty("--size", BOARD_SIZE);
  minesLeftText.textContent = NUMBER_OF_MINES;
  e.target.disabled = true;
  listMinesLeft();
  checkGameEnd();
});

//todo ---------- for Internidiate level ----------
button[1].addEventListener("click", (e) => {
  BOARD_SIZE = 15;
  NUMBER_OF_MINES = 20;
  board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);

  rules.style.display = "none";
  button[0].style.display = "none";
  button[1].style.display = "none";
  button[2].style.display = "none";
  messageText.style.display = "block";

  board.forEach((row) => {
    row.forEach((tile) => {
      boardElement.append(tile.element);
      tile.element.addEventListener("click", () => {
        revealTile(board, tile);
        checkGameEnd();
      });
      tile.element.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        markTile(tile);
        listMinesLeft();
      });
    });
  });
  boardElement.style.setProperty("--size", BOARD_SIZE);
  minesLeftText.textContent = NUMBER_OF_MINES;
  e.target.disabled = true;
  listMinesLeft();
  checkGameEnd();
});

//todo ---------- for Expert level ----------
button[2].addEventListener("click", (e) => {
  BOARD_SIZE = 20;
  NUMBER_OF_MINES = 30;
  board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);

  rules.style.display = "none";
  button[0].style.display = "none";
  button[1].style.display = "none";
  button[2].style.display = "none";
  messageText.style.display = "block";

  board.forEach((row) => {
    row.forEach((tile) => {
      boardElement.append(tile.element);
      tile.element.addEventListener("click", () => {
        revealTile(board, tile);
        checkGameEnd();
      });
      tile.element.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        markTile(tile);
        listMinesLeft();
      });
    });
  });
  boardElement.style.setProperty("--size", BOARD_SIZE);
  minesLeftText.textContent = NUMBER_OF_MINES;
  e.target.disabled = true;
  listMinesLeft();
  checkGameEnd();
});

//todo ---------- restart btn activation ----------
button[3].addEventListener("click", function(){
  location.reload();
});

function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
    );
  }, 0);
  minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount;
  if(minesLeftText.textContent <= 0){
    minesLeftText.textContent = 0;
  }

}

function checkGameEnd() {
  const win = checkWin(board);
  const lose = checkLose(board);

  if (win || lose) {
    boardElement.addEventListener("click", stopProp, { capture: true });
    boardElement.addEventListener("contextmenu", stopProp, { capture: true });
  }

  if (win) {
    messageText.textContent = "You Win";
  }
  if (lose) {
    messageText.textContent = "You Lose";
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_STATUSES.MARKED) markTile(tile);
        if (tile.mine) revealTile(board, tile);
      });
    });
  }
}

function stopProp(e) {
  e.stopImmediatePropagation();
}
