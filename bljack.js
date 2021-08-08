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
      let color;
      if (suits[s] == "♥" || suits[s] == "♦") {
        color = "red";
      }
      if (suits[s] == "♣" || suits[s] == "♠") {
        color = "black";
      }
      deck.push({
        value,
        suit,
        score,
        color,
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
  winOrLose();
  setTimeout(dealerScoring, 2000);
  setTimeout(playerScoring, 2000);
}
// Function to append card and adjust color per suit
function changeCard(card) {
  return `<div class="card_body">
<div class="card_detail" style="color:${card.color};">
<h1 class="card_top">${card.value}</h1>
<h4 class="card_suit_top">${card.suit}</h4>
<h1 class="card_suit">${card.suit}</h1>
<h4 class="card_suit_bottom">${card.suit}</h4>
<h1 class="card_bottom">${card.value}</h1>
</div>
</div>`;
}

// Start of game card display
$(function () {
  $("#start").click(function () {
    // $(".dealt_card").addClass("card_animate");
    $("#player-card0")
      .append(changeCard(player[0]))
      .addClass("card_animate dealt_card")
      .css("animation-delay", "0.2s");
    $("#dealer-card0")
      .append(changeCard(dealer[0]))
      .addClass("card_animate dealt_card")
      .css("animation-delay", "0.4s");
    $("#player-card1")
      .append(changeCard(player[1]))
      .addClass("card_animate dealt_card")
      .css("animation-delay", "0.8s");
    $("#dealer-card1")
      .append(changeCard(dealer[1]))
      .addClass("card_animate dealt_card")
      .css("animation-delay", "1s");
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
  location.reload();
}

// function reStart() {
//   $("#restart").click(function () {
//     location.reload();
//   });
// }

// Hit
function hit() {
  if (playerScore < 21 && player.length === 4) {
    player.push(randomCard(deck));
    $("#player-card4")
      .append(changeCard(player[4]))
      .addClass("card_animate dealt_card");
    playerScoring();
    setTimeout(winOrLose, 1500);
  }

  if (playerScore < 21 && player.length === 3) {
    player.push(randomCard(deck));
    $("#player-card3")
      .append(changeCard(player[3]))
      .addClass("card_animate dealt_card");
    playerScoring();
    setTimeout(winOrLose, 1500);
  }

  if (playerScore < 21 && player.length === 2) {
    player.push(randomCard(deck));
    $("#player-card2")
      .append(changeCard(player[2]))
      .addClass("card_animate dealt_card");
    playerScoring();
    setTimeout(winOrLose, 1500);
  }

  if (dealerScore <= 18 && dealer.length === 3 && dealerScore < playerScore) {
    dealer.push(randomCard(deck));
    $("#dealer-card")
      .append(changeCard(dealer[3]))
      .addClass("card_animate dealt_card");
    dealerScoring();
    setTimeout(winOrLose, 1500);
  }
  if (dealerScore <= 18 && dealer.length === 2 && dealerScore <= playerScore) {
    dealer.push(randomCard(deck));
    $("#dealer-card2")
      .append(changeCard(dealer[2]))
      .addClass("card_animate dealt_card");
    dealerScoring();
    setTimeout(winOrLose, 1500);
  }
  setTimeout(winOrLose, 1500);
}

// Stand
$(function () {
  $("#stand").click(function () {
    if (dealer.length === 4) {
      if (
        dealerScore < playerScore ||
        (dealerScore === playerScore && dealerScore < 21)
      ) {
        dealer.push(randomCard(deck));
        $("#dealer-card4")
          .append(changeCard(dealer[4]))
          .addClass("card_animate dealt_card");
        dealerScoring();
      }
      setTimeout(winOrLose, 1500);
    }
    if (dealer.length === 3) {
      if (
        dealerScore < playerScore ||
        (dealerScore === playerScore && dealerScore < 21)
      ) {
        dealer.push(randomCard(deck));
        $("#dealer-card3")
          .append(changeCard(dealer[3]))
          .addClass("card_animate dealt_card");
        dealerScoring();
      }
      setTimeout(winOrLose, 1500);
    }
    if (dealer.length === 2 || player.length === 2) {
      if (
        dealerScore < playerScore ||
        (dealerScore === playerScore && dealerScore < 21)
      ) {
        dealer.push(randomCard(deck));
        $("#dealer-card2")
          .append(changeCard(dealer[2]))
          .addClass("card_animate dealt_card");
        dealerScoring();
      }
      setTimeout(winOrLose, 1500);
    }
  });
  setTimeout(winOrLose, 1500);
});

// Win/Lose
function winOrLose() {
  if (
    (playerScore < 21 &&
      playerScore < dealerScore &&
      playerScore != dealerScore &&
      player.length == 5) ||
    (playerScore > 21 && playerScore < dealerScore) ||
    (playerScore < dealerScore && dealerScore >= 19 && player.length == 5)
  ) {
    $(".dealer_wins").animate({ opacity: 1, right: "180px" });
    setTimeout(reStartGame, 1500);
  } else if (
    (playerScore < 21 && playerScore > dealerScore && player.length >= 4) ||
    (dealerScore > 21 && playerScore > dealerScore)
  ) {
    $(".player_wins").animate({ opacity: 1, right: "180px" });
    setTimeout(reStartGame, 1500);
  } else if (
    (dealerScore === 21 && playerScore !== 21) ||
    (dealerScore > playerScore &&
      dealerScore >= 19 &&
      dealerScore <= 21 &&
      dealer.length > 2 &&
      player.length > 2) ||
    (playerScore > 21 && dealerScore < 21)
  ) {
    $(".dealer_wins").animate({ opacity: 1, right: "150px" });
    setTimeout(reStartGame, 1500);
  } else if (
    (playerScore === 21 && dealerScore !== 21) ||
    (playerScore === 21 && dealer.length >= 2) ||
    (playerScore > dealerScore &&
      playerScore > 19 &&
      playerScore < 21 &&
      dealer.length > 2) ||
    (playerScore > dealerScore &&
      playerScore > 19 &&
      playerScore < 21 &&
      player.length > 2) ||
    (dealerScore > 21 && playerScore < 21) ||
    (playerScore > 21 && dealerScore > 21 && playerScore > dealerScore)
  ) {
    $(".player_wins").animate({ opacity: 1, right: "180px" });
    setTimeout(reStartGame, 1500);
  } else if (
    playerScore === dealerScore &&
    dealerScore >= 20 &&
    dealer.length >= 3
  ) {
    $(".push").animate({ opacity: 1, right: "180px" });
  }
}
