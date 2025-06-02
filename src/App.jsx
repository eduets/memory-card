import { useState } from "react";
import { characters } from "./scripts/characters.js";
import { shuffle } from "./scripts/utils.js";
import { Card } from "./components/Card.jsx";

function App() {
  const [charactersList, setCharactersList] = useState(shuffle(characters));
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pickedIds, setPickedIds] = useState([]);

  const [justLost, setJustLost] = useState(false);
  const [justWon, setJustWon] = useState(false);

  function handleClick(id) {
    if (pickedIds.includes(id)) {
      setCurrentScore(0);
      setPickedIds([]);
      setJustLost(true);
    } else {
      const nextCurrentScore = currentScore + 1;
      if (nextCurrentScore > bestScore) {
        setBestScore(nextCurrentScore);
      }
      const nextPicekdIds = [...pickedIds];
      nextPicekdIds.push(id);

      if (nextPicekdIds.length >= charactersList.length) {
        setCurrentScore(0);
        setPickedIds([]);
        setJustWon(true);
      } else {
        setCurrentScore(nextCurrentScore);
        setPickedIds(nextPicekdIds);
        setJustLost(false);
        setJustWon(false);
      }
    }
    setCharactersList(shuffle(charactersList));
  }

  const cardsResult = [];
  for (const character of charactersList) {
    cardsResult.push(
      <Card
        key={character.id}
        name={character.name}
        id={character.id}
        handleClick={handleClick}
      />
    );
  }
  return (
    <>
      <h1>Attack On Titan Memory Card</h1>
      <div className="instructions">
        Get points by clicking on an image but don't click on any more than
        once!
      </div>
      <div className="scores">
        <div className="score">
          <h2>Current score: </h2>
          <div className={`number ${justLost ? "scale" : ""}`}>
            {currentScore}
          </div>
        </div>
        <div className="score">
          <h2>Best score: </h2>
          <div className={`number ${justWon ? "scale" : ""}`}>{bestScore}</div>
        </div>
      </div>
      <div className="cards">{cardsResult}</div>
    </>
  );
}

export default App;
