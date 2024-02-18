const icons = [
  "fas fa-heart",
  "fas fa-gamepad",
  "fas fa-ghost",
  "fas fa-dice",
  "fas fa-chess",
  "fas fa-dragon",
  "fas fa-puzzle-piece",
  "fas fa-star",
];
function restartGame() {
  gameBoard.innerHTML = " ";
  flippedCards = 0;
  lockBoard = false;
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => card.classList.remove("flipped"));
  init();
}

const restartButton = document.querySelector(".restart-btn");
restartButton.addEventListener("click", restartGame);

const gameBoard = document.querySelector(".game-board");
const cards = [...icons, ...icons];
let firstCard, secondCard;
let flippedCards = 0;
let lockBoard = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCard(icon) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
        <div class="card-inner">
          <div class="card-front"><i class="${icon}"></i></div>
          <div class="card-back"></div>
        </div>`;
  card.addEventListener("click", flipCard);
  return card;
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (
    firstCard.querySelector(".card-front i").className ===
    secondCard.querySelector(".card-front i").className
  ) {
    disableCards();
    return;
  }

  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
  flippedCards++; // Increment the number of flipped cards
  checkForWin(); // Check if all cards have been flipped
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function checkForWin() {
  if (flippedCards === cards.length / 2) {
    const winText = document.createElement("div");
    winText.classList.add("win-text");
    winText.setAttribute("id", "winText");
    winText.innerText = "You did it!";
    gameBoard.appendChild(winText);
  }
}

function init() {
  const shuffledCards = shuffle(cards);
  shuffledCards.forEach((icon) => {
    const card = createCard(icon);
    gameBoard.appendChild(card);
  });
}

init();
