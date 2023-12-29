import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function WordDisplay() {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [wordRevealed, setWordRevealed] = useState(false);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Load players from the RoleSelection component
  useEffect(() => {
    if (location.state && location.state.players) {
      setPlayers(location.state.players);
    }
  }, [location.state]);

  // Function to reveal the word to the current player
  const revealWord = () => {
    setWordRevealed(true);
  };

  // Function to handle acknowledgment and move to the next player or start the game
  const handleAcknowledgment = () => {
    if (currentPlayerIndex < players.length - 1) {
      // Move to the next player
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setWordRevealed(false);
    } else {
      // Last player acknowledged, navigate to the game start
      navigate('/game', { state: { players } });
    }
  };

  return (
    <div>
      <h1>Word for {players[currentPlayerIndex]?.name}</h1>
      {wordRevealed ? (
        <div>
          <p>{players[currentPlayerIndex]?.word}</p>
          <button onClick={handleAcknowledgment}>I Remember My Word</button>
        </div>
      ) : (
        <button onClick={revealWord}>Reveal Word</button>
      )}
    </div>
  );
}

export default WordDisplay;
