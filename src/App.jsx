import { useState } from "react";
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

  const [deck, setDeck] = useState(() => shuffle(createDeck()));

  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);

  const playerScore = GetScore(playerCards);
  const dealerScore = GetScore(dealerCards);

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
  setPlayerTurn
  };

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
          {dealerCards.map((card, i) => (
            <Card key={i} card={card} />
          ))}
        </div>

        <div className="hand">
          {playerCards.map((card, i) => (
            <Card key={i} card={card} />
          ))}
        </div>

        <button className="buttons" onClick={() => Deal(gameState)}>Deal</button>
        
        <button className="buttons" disabled={!gameStarted || gameOver} 
        onClick={() =>Hit(gameState)}>Hit</button>
        
        <button className="buttons" disabled={!gameStarted || gameOver} 
        onClick={() =>Stand(gameState)}>Stand

        </button>
        <p>{playerScore}</p>
        <h2>
        {GetWinner(gameState)}
        </h2>
      </div>
      <div id="deck-area">

      </div>
    </section>
  );
}
