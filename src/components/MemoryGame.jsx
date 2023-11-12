import { useEffect, useState } from "react";
import Card from "./Card";
import "/src/styles/MemoryGame.css";

function MemoryGame() {
  const clickedCards = [];
  const numCards = 12;

  const [cards, setCards] = useState(createCards(numCards));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  function createCards(numCards) {
    // Generate unique pokemon ids in range 1 to 1017
    const ids = [];
    for (let i = 0; i < numCards; i++) {
      let id;
      do {
        id = Math.floor(Math.random() * 1017) + 1;
      } while (ids.includes(id));

      ids.push(id);
    }

    return ids.map((id) => (
      <Card key={id} id={id} handleClick={() => handleCardClicked(id)} />
    ));
  }

  function handleCardClicked(id) {
    if (clickedCards.includes(id)) {
      clickedCards.length = 0;
      setScore(0);
      setGameOver(true);
    } else {
      clickedCards.push(id);
      setScore((score) => score + 1);
      shuffle();
    }
  }

  function shuffle() {
    const array = [...cards];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setCards(array);
  }

  const playAgain = () => {
    window.location.reload(false);
  };

  const handleGameOver = () => {
    setGameOver(false);
    shuffle();
  };

  return (
    <>
      <div className="score-container">
        <p>Score: {score}</p>
        <p>High Score: {highScore}</p>
      </div>
      <div className="card__container">{cards}</div>
      {gameOver && (
        <div className="modal-container">
          <div className="modal">
            Game over...
            <button onClick={handleGameOver}>Try again</button>
          </div>
        </div>
      )}
      {score === numCards && (
        <div className="modal-container">
          <div className="modal">
            You win!
            <button onClick={playAgain}>Play again</button>
          </div>
        </div>
      )}
    </>
  );
}

export default MemoryGame;
