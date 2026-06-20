import { useState, useEffect } from "react";
import "./App.css";
import {createDeck, Card} from "./Cards.jsx";
import { Deck, shuffle } from "./Deck.jsx";
import {
  Hit,
  Stand,
  GetScore,
  Deal,
  GetWinner,
  IsBlackjack
} from "./GameLogic.jsx";


export default function App() {
  
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [roundCounted, setRoundCounted] = useState(false);

  const [deck, setDeck] = useState(() => shuffle(createDeck()));

  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);

  const playerScore = GetScore(playerCards);
  const dealerScore = GetScore(dealerCards);

  const [wins, setwins] = useState(0);
  const [loses, setloses] = useState(0);
  const [pushes, setpushes] = useState(0);


  const gameState = {
  deck,
  setDeck,
  playerCards,
  setPlayerCards,
  dealerCards,
  setDealerCards,
  setGameStarted,
  setGameOver,
  gameStarted,
  gameOver,
  playerTurn,
  setPlayerTurn,
  setwins,
  wins,
  setloses,
  loses,
  setpushes,
  pushes,
  roundCounted,
  setRoundCounted
  };

  const winner = GetWinner(gameState);

useEffect(() => {
  if (!gameOver || roundCounted) return;

  console.log("Counting winner:", winner);

  if (winner === "Player Wins") {
    setwins(prev => prev + 1);
  } 
  else if (winner === "Dealer Wins") {
    setloses(prev => prev + 1);
  } 
  else if (winner === "Push") {
    setpushes(prev => prev + 1);
  }

  setRoundCounted(true);

}, [gameOver, winner, roundCounted]);

  return (
    <section id="table">
      <div id="deck-area">
        <Deck count={deck.length} />
      </div>
      <div id="game-area">
        <h1>Blackjack</h1>

        <h2>Dealer</h2>
        <p>{dealerScore}</p>
        <div className="hand">
          {dealerCards.map((card, i) => (<Card key={i} card={card} index={i} />))}
        </div>
        <div className="hand">
          {playerCards.map((card, i) => (<Card key={i} card={card} index={i} />))}
        </div>

        <button className="buttons" onClick={() => Deal(gameState)}>Deal</button>
        
        <button className="buttons" disabled={!gameStarted || gameOver} 
        onClick={() =>Hit(gameState)}>Hit</button>
        
        <button className="buttons" disabled={!gameStarted || gameOver} 
        onClick={() =>Stand(gameState)}>Stand

        </button>
        <p>{playerScore}</p>
        <h2>{GetWinner(gameState)}</h2>
      </div>
      <div id="score-bord">
        <h2>Wins: {wins}</h2>
        <h2>Loses: {loses}</h2>
        <h2>Pushes: {pushes}</h2>
      </div>
    </section>
  );
}

