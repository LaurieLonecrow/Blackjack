//References:
//https://www.thatsoftwaredude.com/content/6417/how-to-code-blackjack-using-javascript
//https://www.youtube.com/watch?v=oT49KkhOv-Y "2 - How to Blackjack in Javascript and HTML"
//both used as a general guide to building the deck and game logic

var dealer = [];
var player = [];
var dealerScore;
var playerScore;
var deck;

function fullDeck() {
  const suits = ["Heart", "Diamonds", "Spades", "Clubs"];
  const values = [
    "Ace",
    "King",
    "Queen",
    "Jack",
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
      if (values[v] == "King" || values[v] == "Queen" || values[v] == "Jack") {
        score = 10;
      }
      if (values[v] == "Ace") {
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
//Build the player's hand
function dealPlayerHand(deck) {
  player.push(randomCard(deck));
}
//Build the dealer's hand
function dealDealerHand(deck) {
  dealer.push(randomCard(deck));
}
//add up the player's score
function playerScoring() {
  playerScore = 0;
  for (let i = 0; i < player.length; i++) {
    playerScore += player[i].score;
  }
}
//add up the dealer's score
function dealerScoring() {
  dealerScore = 0;
  for (let i = 0; i < dealer.length; i++) {
    dealerScore += dealer[i].score;
  }
}

// Hit
function hit() {
  dealPlayerHand(deck);
}

// Stay
function stay() {
  if (dealerScore < 21) {
    dealDealerHand(deck);
  }
}

// Win/Lose, Play Again

// Rendering in the DOM

// Card Images

// Score
