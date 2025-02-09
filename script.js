document.addEventListener("DOMContentLoaded", () => {
  const cardsArray = [
    {
      name: "elephant",
      img: "https://www.shutterstock.com/image-photo/cute-little-baby-elephant-mother-600nw-2467644619.jpg",
    },
    {
      name: "elephant",
      img: "https://www.shutterstock.com/image-photo/cute-little-baby-elephant-mother-600nw-2467644619.jpg",
    },
    {
      name: "lion",
      img: "https://thumbs.dreamstime.com/b/big-lion-lying-savannah-grass-landscape-characteristic-trees-plain-hills-background-35172905.jpg",
    },
    {
      name: "lion",
      img: "https://thumbs.dreamstime.com/b/big-lion-lying-savannah-grass-landscape-characteristic-trees-plain-hills-background-35172905.jpg",
    },
    {
      name: "tiger",
      img: "https://cdn.pixabay.com/photo/2017/07/24/19/57/tiger-2535888_1280.jpg",
    },
    {
      name: "tiger",
      img: "https://cdn.pixabay.com/photo/2017/07/24/19/57/tiger-2535888_1280.jpg",
    },
    {
      name: "horse",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpSgaSl-R-1BPQ1CAMJv3szlAL1rFOInW_LQ&s",
    },
    {
      name: "horse",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpSgaSl-R-1BPQ1CAMJv3szlAL1rFOInW_LQ&s",
    },
    {
      name: "dogs",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQQX0nuVvjZBg6DQtddHs4eNdWAh4Avgpc6Q&s",
    },
    {
      name: "dogs",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQQX0nuVvjZBg6DQtddHs4eNdWAh4Avgpc6Q&s",
    },
    {
      name: "cats",
      img: "https://cdn.firstcry.com/education/2022/05/12134659/Essay-on-cat.jpg",
    },
    {
      name: "cats",
      img: "https://cdn.firstcry.com/education/2022/05/12134659/Essay-on-cat.jpg",
    },
  ];

  const gameBoard = document.getElementById("game-board");
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;

  function createBoard() {
    shuffle(cardsArray);
    gameBoard.innerHTML = "";
    cardsArray.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.dataset.name = card.name;
      cardElement.innerHTML = `
                <div class="front"><img src="${card.img}" alt="${card.name}"></div>
                <div class="back"></div>
            `;
      cardElement.addEventListener("click", flipCard);
      gameBoard.appendChild(cardElement);
    });
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
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;
    if (isMatch) {
      markCardsAsMatched();
    } else {
      unflipCards();
    }
  }

  function markCardsAsMatched() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    firstCard.querySelector("img").style.display = "none";
    secondCard.querySelector("img").style.display = "none";
    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 2000); // Flipped for 3 seconds
  }

  function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  document.getElementById("restart").addEventListener("click", () => {
    gameBoard.innerHTML = "";
    createBoard();
  });

  createBoard();
});
