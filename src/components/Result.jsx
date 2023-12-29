import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const players = location.state?.players;

  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [gameOutcome, setGameOutcome] = useState(null);
  const [showPlayerInfo, setShowPlayerInfo] = useState(false);
  const [showNewGameButton, setShowNewGameButton] = useState(false); // State for showing New Game button

  if (!players) {
    return <div>Error: No player data available.</div>;
  }

  const handleCheckboxChange = (e) => {
    const playerName = e.target.value;
    setSelectedPlayers((prevSelectedPlayers) => {
      if (prevSelectedPlayers.includes(playerName)) {
        return prevSelectedPlayers.filter((name) => name !== playerName);
      } else {
        return [...prevSelectedPlayers, playerName];
      }
    });
  };

  const handleVoteSubmit = () => {
    const wolvesVoted = selectedPlayers.some((selectedPlayerName) =>
      players.some((player) => player.name === selectedPlayerName && player.role === 'wolf')
    );

    if (wolvesVoted) {
      setGameOutcome('Wolves Win!');
    } else {
      setGameOutcome('Citizens Win!');
    }
    setShowPlayerInfo(true); // Reveal player info after vote is submitted
    setShowNewGameButton(true); // Show New Game button
  };

  const handleNewGameClick = () => {
    navigate('/'); // Navigate to the root path
  };

  return (
    <div>
      <h1>Game Result</h1>
      <form>
        <h2>Vote for the Wolf/Wolves</h2>
        <p>Select Wolf/Wolves:</p>
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  value={player.name}
                  onChange={handleCheckboxChange}
                  checked={selectedPlayers.includes(player.name)}
                />
                {player.name}
              </label>
            </li>
          ))}
        </ul>
        <button type="button" onClick={handleVoteSubmit}>
          Submit Vote
        </button>
      </form>

      {gameOutcome && <p>{gameOutcome}</p>}

      {showPlayerInfo && (
      <div>
        <h2>Player Information</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              <strong>Name:</strong> {player.name}<br />
              <strong>Role:</strong>
              <span style={{ color: player.role === 'wolf' ? 'red' : 'black' }}>
                 {player.role}
              </span>
              <br />
              <strong>Guess:</strong> {player.guess}<br />
              <strong>Word:</strong> {player.word}
            </li>
          ))}
        </ul>
      </div>
)}


      {showNewGameButton && (
        <button onClick={handleNewGameClick}>New Game</button>
      )}
    </div>
  );
}

export default Result;
