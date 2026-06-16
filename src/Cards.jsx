import { useState } from 'react'

export const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]

export function getColor(suit) {
  return suit === "♥" || suit === "♦" ? "red" : "white";
}
export function Card({ card }) {
  return (
    <div className="card" style={{ color: getColor(card.suit) }}>
      <div className="corner top-left">{card.rank}</div>

      <div className="corner top-right">{card.suit}</div>

      <div className="corner bottom-left">{card.suit}</div>

      <div className="corner bottom-right">{card.rank}</div>
    </div>
  );
}

export const createDeck = () => {
  const deck = [];

  for (let suit of suits) {
    for (let rank of ranks) {
      let value = 0;

      if (rank === "A") value = 11;
      else if (["K", "Q", "J"].includes(rank)) value = 10;
      else value = Number(rank);

      deck.push({ suit, rank, value });
    }
  }

  return deck;
};



