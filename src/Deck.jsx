import { suits, getColor } from "./Cards.jsx";

export function Deck({ count }) {
  const visibleCards = Math.min(count, 52);

  return (
    <div className="deck">
      {Array.from({ length: visibleCards }).map((_, index) => (
        <div
          key={index}
          className="deck-card"
          style={{
            transform: `
              translate(${index * 0.5}px, ${index * 1}px)
              rotate(${(index % 5) - 2}deg)
            `,
            zIndex: index,}}
        >
          {index === visibleCards - 1 &&
            suits.map((suit, i) => (
              <div
                key={i}
                className={`corner ${[
                    "top-left",
                    "top-right",
                    "bottom-left",
                    "bottom-right",
                  ][i]}`} style={{ color: getColor(suit) }}
              >
                {suit}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}



export function shuffle(deck) {

  const newDeck = [...deck];

  for (let i = newDeck.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}