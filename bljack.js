//References:
//https://www.thatsoftwaredude.com/content/6417/how-to-code-blackjack-using-javascript
//https://www.youtube.com/watch?v=oT49KkhOv-Y "2 - How to Blackjack in Javascript and HTML"
//both used as a general guide to building the deck and game logic

var dealer = [];
var player = [];
var dealerScore = 0;
var playerScore = 0;
var deck;

function fullDeck() {
  const suits = ["♥", "♦", "♣", "♠"];
  const values = [
    "A",
    "K",
    "Q",
    "J",
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];
  deck = [];
  for (let s = 0; s < suits.length; s++) {
    for (let v = 0; v < values.length; v++) {
      let suit = suits[s];
      let value = values[v];
      let score = parseInt(values[v]);
      if (values[v] == "K" || values[v] == "Q" || values[v] == "J") {
        score = 10;
      }
      if (values[v] == "A") {
        score = 1;
      }
      deck.push({
        value,
        suit,
        score,
      });
    }
  }

  return deck;
}
fullDeck();

// Randomly choose a card when called, and splice to remove that card from the deck.
function randomCard() {
  const randomIndex = Math.floor(Math.random() * deck.length);
  const cardDrawn = deck[randomIndex];
  deck.splice(randomIndex, 1);
  return cardDrawn;
}

//add up the player's score with Ace value 11 for inital deal
function playerScoring() {
  playerScore = 0;
  for (let i = 0; i < player.length; i++) {
    if (
      (player[0].value === "A" && player[1].score == 10) ||
      (player[1].value === "A" && player[0].score == 10)
    ) {
      playerScore = 21;
    } else {
      playerScore += player[i].score;
    }
  }
  $("#player-score").html(`<h1>${playerScore}</h1>`);
  return playerScore;
}

//add up the dealer's score with Ace value 11 for inital deal
function dealerScoring() {
  dealerScore = 0;
  for (let i = 0; i < dealer.length; i++) {
    if (
      (dealer[0].value === "A" && dealer[1].score == 10) ||
      (dealer[1].value === "A" && dealer[0].score == 10)
    ) {
      dealerScore = 21;
    } else {
      dealerScore += dealer[i].score;
    }
  }
  $("#dealer-score").html(`<h1>${dealerScore}</h1>`);
  return dealerScore;
}

//Start the Game
function startGame() {
  player.push(randomCard(deck));
  dealer.push(randomCard(deck));
  player.push(randomCard(deck));
  dealer.push(randomCard(deck));
  playerScoring();
  dealerScoring();
}

function changeCard(card) {
  if (card.suit === "♥" || card.suit === "♦") {
    $(".card_detail").css("color", "red");
  } else if (card.suit === "♣" || card.suit === "♠") {
    $(".card_detail").css("color", "black");
  }
  return (cardAppend = `<div class="card_body">
<div class="card_detail">
<h1 class="card_top">${card.value}</h1>
<h1 class="card_suit">${card.suit}</h1>
<h1 class="card_bottom">${card.value}</h1>
</div>
</div>`);
}

// Start of game card display
$(function () {
  $("#start").click(function () {
    $(".header_title").hide();
    $("#dealer-card0").append(changeCard(dealer[0]));
    $("#dealer-card1").append(changeCard(dealer[1]));
    $("#player-card0").append(changeCard(player[0]));
    $("#player-card1").append(changeCard(player[1]));
    $("#start").css("display", "none");
    $("#restart").css("display", "block");
  });
});

//Restart the Game
function reStartGame() {
  fullDeck();
  dealer = [];
  player = [];
  playerScoring();
  dealerScoring();
}
$(function () {
  $("#restart").click(function () {
    location.reload();
  });
});

// Hit
function hit() {
  if (playerScore < 21 && player.length === 4) {
    player.push(randomCard(deck));
    $("#player-card4").append(changeCard(player[4]));
    playerScoring();
  }

  if (playerScore < 21 && player.length === 3) {
    player.push(randomCard(deck));
    $("#player-card3").append(changeCard(player[3]));
    playerScoring();
  }

  if (playerScore < 21 && player.length === 2) {
    player.push(randomCard(deck));
    $("#player-card2").append(changeCard(player[2]));
    playerScoring();
  }

  if (dealerScore <= 19 && dealer.length === 3) {
    dealer.push(randomCard(deck));
    $("#dealer-card").append(changeCard(dealer[3]));
    dealerScoring();
  }
  if (dealerScore <= 19 && dealer.length === 2) {
    dealer.push(randomCard(deck));
    $("#dealer-card2").append(changeCard(dealer[2]));
    dealerScoring();
  }
}

// Stand
$(function () {
  $("#stand").click(function () {
    if (dealerScore < playerScore && dealer.length === 2) {
      dealer.push(randomCard(deck));
      $("#dealer-card2").append(changeCard(dealer[2]));
      dealerScoring();
    }
  });
});

// Win/Lose
$(function () {
  if (dealerScore === 21) {
    $(".dealer_wins").toggleClass("display");
  }
  if (playerScore === 21) {
    $(".player_wins").toggleClass("display");
  }
});
