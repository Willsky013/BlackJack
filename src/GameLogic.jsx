import { useState } from 'react'
import { createDeck } from "./Cards.jsx";
import { shuffle } from "./Deck.jsx";

export function Hit(props) {

  const card = props.deck[0];

  const newHand = [
    ...props.playerCards,
    card
  ];

  props.setDeck(props.deck.slice(1));

  props.setPlayerCards(newHand);

  const score = GetScore(newHand);

  if (score >= 21)
    {
    props.setPlayerTurn(false);
    props.setGameOver(true);
  }
}


export function Stand(props) {

  let dealerHand = [...props.dealerCards];
  let currentDeck = [...props.deck];

  while (GetScore(dealerHand) < 17) 
  {
    dealerHand.push(currentDeck[0]);
    currentDeck.shift();
  }

  props.setDealerCards(dealerHand);
  props.setDeck(currentDeck);

  props.setPlayerTurn(false);
  props.setGameOver(true);
}


export function Deal(props) {

  props.setPlayerCards([]);
  props.setDealerCards([]);

  const currentDeck = NewDeck(props);

  const playerHand = [
    currentDeck[0],
    currentDeck[1]
  ];

  const dealerHand = [
    currentDeck[2],
    currentDeck[3]
  ];

  setTimeout(() => {
  props.setPlayerCards(playerHand);
  props.setDealerCards(dealerHand);
  }, 50);

  props.setDeck(currentDeck.slice(4));

  props.setGameStarted(true);
  props.setGameOver(false);
  props.setPlayerTurn(true);

  const playerBlackjack = IsBlackjack(playerHand);
  const dealerBlackjack = IsBlackjack(dealerHand);

  if (playerBlackjack || dealerBlackjack) {
    props.setGameOver(true);
    props.setPlayerTurn(false);
  }
}


export function GetScore(cards) {
  let total = 0;
  let aces = 0;

  cards.forEach(card => {total += card.value;
    if (card.rank === "A") {
      aces++;
    }});

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}


export function GetWinner(props) {

  if (!props.gameOver)
    return "";

  const playerScore = GetScore(props.playerCards);
  const dealerScore = GetScore(props.dealerCards);

  if (playerScore > 21)
    return "Dealer Wins";

  if (dealerScore > 21)
    return "Player Wins";

  if (playerScore > dealerScore)
    return "Player Wins";

  if (dealerScore > playerScore)
    return "Dealer Wins";

  return "Push";
}

export function IsBlackjack(cards) {
  return (
    cards.length === 2 &&
    GetScore(cards) === 21
  );
}
function NewDeck(props)
{
  if (props.deck.length <= 10)
    return shuffle(createDeck());

  return props.deck;
}