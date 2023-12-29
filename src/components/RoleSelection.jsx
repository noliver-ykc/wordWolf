import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ww_word_list from './ww_word_list.json';

function RoleSelection() {
  const [numWolves, setNumWolves] = useState(1);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Load players from the PlayerEntry component
  useEffect(() => {
    if (location.state && location.state.players) {
      setPlayers(location.state.players.map(player => ({ name: player, role: '', word: '' })));
    }
  }, [location.state]);

  // Handle change in number of wolves
  const handleNumWolvesChange = (event) => {
    setNumWolves(parseInt(event.target.value, 10));
  };

  // Assign roles and words to players
  const assignRolesAndWords = () => {
    let shuffledPlayers = [...players].sort(() => 0.5 - Math.random());
    shuffledPlayers = shuffledPlayers.map((player, index) => {
      const role = index < numWolves ? 'wolf' : 'citizen';
      return { ...player, role };
    });


    const wordPair = ww_word_list[Math.floor(Math.random() * ww_word_list.length)];
    shuffledPlayers = shuffledPlayers.map(player => ({
      ...player,
      word: player.role === 'wolf' ? wordPair.wolf : wordPair.citizens
    }));

    return shuffledPlayers;
  };

  // Start the game and navigate to WordDisplay
  const startGame = () => {
    const updatedPlayers = assignRolesAndWords();
    navigate('/word-display', { state: { players: updatedPlayers } });
  };

  return (
    <div>
      <h1>Role Selection</h1>
      <label>
        Number of Wolves:
        <input
          type="number"
          value={numWolves}
          onChange={handleNumWolvesChange}
          min="1"
          max={players.length - 1}
        />
      </label>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default RoleSelection;
