const icons = [
  "fas fa-heart",
  "fas fa-gamepad",
  "fas fa-ghost",
  "fas fa-dice",
  "fas fa-chess",
  "fas fa-dragon",
  "fas fa-puzzle-piece",
  "fas fa-star",
  "fas fa-film",
  "fas fa-code",
  "fas fa-book-skull",
  "fas fa-diamond",
  "fas fa-chess-rook",
  "fas fa-bone",
  "fas fa-laptop",
];

let clickCount = 0;

function restartGame() {
  clickCount = 0;
  document.getElementById("flipCount").innerText = `Flips: 0`;
  gameBoard.innerHTML = " ";
  flippedCards = 0;
  lockBoard = false;
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => card.classList.remove("flipped"));
  initGame();
}

const restartButton = document.querySelector(".restart-btn");
restartButton.addEventListener("click", restartGame);

const gameBoard = document.querySelector(".game-board");
const cards = [...icons, ...icons];
let firstCard, secondCard;
let flippedCards = 0;
let lockBoard = false;

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCardElement(icon) {
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
  clickCount++;
  document.getElementById("flipCount").innerText = `Flips: ${clickCount}`;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForCardMatch();
}

function checkForCardMatch() {
  if (
    firstCard.querySelector(".card-front i").className ===
    secondCard.querySelector(".card-front i").className
  ) {
    disableMatchedCards();
    return;
  }

  unflipMismatchedCards();
}

function disableMatchedCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
  flippedCards++; // Increment the number of flipped cards
  checkForWin(); // Check if all cards have been flipped
}

function unflipMismatchedCards() {
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
    winText.innerText = `You did it in ${clickCount} flips!`;
    gameBoard.appendChild(winText);
  }
}

function initGame() {
  const shuffledCards = shuffleCards(cards);
  shuffledCards.forEach((icon) => {
    const card = createCardElement(icon);
    gameBoard.appendChild(card);
  });
}

initGame();
