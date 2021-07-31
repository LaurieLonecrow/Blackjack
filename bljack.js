//References:
//https://www.thatsoftwaredude.com/content/6417/how-to-code-blackjack-using-javascript
//used as a general guide to building the deck and game logic

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
  const deck = [];
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
// Cards is now a variable of the full deck array with suits, values, and score
const cards = fullDeck();

// Randomly choose a card when called, and splice to remove that card from the deck.
function drawCard(cards) {
  const random = Math.floor(Math.random() * cards.length);
  const cardDrawn = cards[random];
  cards.splice(random, 1);
  return cardDrawn;
}

// Use score prop to increase score after each card is played
function scoreCard() {
  const score = 0;

  return score;
}

// Hit, Stay, Win/Lose, Play Again
// change card image based on card suit/value
// intro/loading
