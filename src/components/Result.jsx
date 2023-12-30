import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Button, Checkbox, FormControlLabel, Box, FormGroup, Divider } from '@mui/material';
import { ContinueButton, CustomButton } from './CustomButton';

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const players = location.state?.players;

  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [gameOutcome, setGameOutcome] = useState(null);
  const [showPlayerInfo, setShowPlayerInfo] = useState(false);
  const [showVoteSection, setShowVoteSection] = useState(true); // control the vote section display
  const [showNewGameButton, setShowNewGameButton] = useState(false);



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

    if (!wolvesVoted) {
      setGameOutcome('Wolves Win!');
    } else {
      setGameOutcome('Citizens Win!');
    }
    setShowPlayerInfo(true);
    setShowVoteSection(false); // Hide the vote section after vote is submitted
    setShowNewGameButton(true);
  };

  const handleNewGameClick = () => {
    navigate('/'); // Navigate to the root path
  };
  if (!players) {
    return <>
      <Typography>Error: No player data available.</Typography>
        <ContinueButton onClick={handleNewGameClick}>
          New Game ＞
        </ContinueButton>
    </>
  }
  return (
    <Box>
      {showVoteSection && (
        <Box component="form">
          <Typography variant="h4" gutterBottom>Time to Vote!</Typography>
          <FormGroup sx={{ mb: 2 }}>
            {players.map((player, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    value={player.name}
                    onChange={handleCheckboxChange}
                    checked={selectedPlayers.includes(player.name)}
                  />
                }
                label={player.name}
              />
            ))}
          </FormGroup>
          <CustomButton onClick={handleVoteSubmit}>
            Submit Vote
          </CustomButton>
        </Box>
      )}

      {gameOutcome && <Typography variant="h3">{gameOutcome}</Typography>}

      {showPlayerInfo && (
        <Box>
          {players.map((player, index) => (
            <Box key={index} sx={{ color: player.role === 'wolf' ? 'red' : 'green' }}>
              <Typography>
                <strong>{player.role} : {player.name}</strong>
                <span>

                </span>
              </Typography>
              <Typography><strong>Word:</strong> {player.word}</Typography>
              <Divider light />
            </Box>
          ))}
        </Box>
      )}

      {showNewGameButton && (
        <ContinueButton onClick={handleNewGameClick}>
          New Game ＞
        </ContinueButton>
      )}
    </Box>
  );
}

export default Result;
