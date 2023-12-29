import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PlayerEntry() {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate(); // Used for navigation

  // Function to handle the addition of a player
  const handleAddPlayer = () => {
    if (playerName.trim() !== '') {
      setPlayers(prevPlayers => [...prevPlayers, playerName.trim()]);
      setPlayerName(''); // Clear input field after adding
    }
  };

  // Function to handle the submission of the player list
  const handleSubmit = () => {
    if (players.length > 0) {
      navigate('/role-selection', { state: { players } });
    } else {
      alert("Please add at least one player.");
    }
  };

  return (
    <div>
      <h1>Player Entry</h1>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter player name"
      />
      <button onClick={handleAddPlayer}>Add Player</button>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Continue to Role Selection</button>
    </div>
  );
}

export default PlayerEntry;
