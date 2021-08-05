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
  const suits = ["Heart", "Diamonds", "Spades", "Clubs"];
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
        score = 11;
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

//add up the player's score
function playerScoring() {
  playerScore = 0;
  for (let i = 0; i < player.length; i++) {
    playerScore += player[i].score;
  }
  $("#player-score").html(`<h1>${playerScore}</h1>`);

  return playerScore;
}
//add up the dealer's score
function dealerScoring() {
  dealerScore = 0;
  for (let i = 0; i < dealer.length; i++) {
    dealerScore += dealer[i].score;
  }
  $("#dealer-score").html(`<h1>${dealerScore}</h1>`);

  return dealerScore;
}

//Build the hands

function startGame() {
  player.push(randomCard(deck));
  dealer.push(randomCard(deck));
  player.push(randomCard(deck));
  dealer.push(randomCard(deck));
  playerScoring();
  dealerScoring();
}
// Hit
function hit() {
  if (playerScore < 21) {
    player.push(randomCard(deck));
    $("#player-card2").append(`<div class="card_body">
  <div class="card_detail">
  <h1 class="card_top">${player[2].value}</h1>
  <h1 class="card_suit">${player[2].suit}</h1>
  <h1 class="card_bottom">${player[2].value}</h1>
  </div>
  </div>`);

    if (dealerScore < 21) {
      dealer.push(randomCard(deck));
      $("#dealer-card2").append(`<div class="card_body">
    <div class="card_detail">
    <h1 class="card_top">${dealer[2].value}</h1>
    <h1 class="card_suit">${dealer[2].suit}</h1>
    <h1 class="card_bottom">${dealer[2].value}</h1>
    </div>
    </div>`);
    }
  }
  playerScoring();
  dealerScoring();

  if (player.length === 3) {
    player.push(randomCard(deck));
    $("#player-card3").append(`<div class="card_body">
  <div class="card_detail">
  <h1 class="card_top">${player[3].value}</h1>
  <h1 class="card_suit">${player[3].suit}</h1>
  <h1 class="card_bottom">${player[3].value}</h1>
  </div>
  </div>`);
  }
  if (player.length === 4) {
    player.push(randomCard(deck));
    $("#player-card4").append(`<div class="card_body">
  <div class="card_detail">
  <h1 class="card_top">${player[4].value}</h1>
  <h1 class="card_suit">${player[4].suit}</h1>
  <h1 class="card_bottom">${player[4].value}</h1>
  </div>
  </div>`);
  }
}

$(function () {
  $("#start").click(function () {
    $("#dealer-card0").append(`<div class="card_body">
  <div class="card_detail">
  <h1 class="card_top">${dealer[0].value}</h1>
  <h1 class="card_suit">${dealer[0].suit}</h1>
  <h1 class="card_bottom">${dealer[0].value}</h1>
  </div>
  </div>`);
    $("#dealer-card1").append(`<div class="card_body">
  <div class="card_detail">
  <h1 class="card_top">${dealer[1].value}</h1>
  <h1 class="card_suit">${dealer[1].suit}</h1>
  <h1 class="card_bottom">${dealer[1].value}</h1>
  </div>
  </div>`);

    $("#player-card0").append(`<div class="card_body">
<div class="card_detail">
<h1 class="card_top">${player[0].value}</h1>
<h1 class="card_suit">${player[0].suit}</h1>
<h1 class="card_bottom">${player[0].value}</h1>
</div>
</div>`);
    $("#player-card1").append(`<div class="card_body">
<div class="card_detail">
<h1 class="card_top">${player[1].value}</h1>
<h1 class="card_suit">${player[1].suit}</h1>
<h1 class="card_bottom">${player[1].value}</h1>
</div>
</div>`);
  });
});

// Stand
$(function () {
  $("#stand").click(function () {
    if (dealerScore < 20) {
      $("#dealer-card2").append(`<div class="card_body">
      <div class="card_detail">
      <h1 class="card_top">${dealer[1].value}</h1>
      <h1 class="card_suit">${dealer[1].suit}</h1>
      <h1 class="card_bottom">${dealer[1].value}</h1>
      </div>
      </div>`);
    }
  });
});

// Win/Lose, Play Again
