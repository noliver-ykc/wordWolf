import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography, TextField, Box } from '@mui/material';
import ww_word_list from './ww_word_list.json';
import { ContinueButton } from './CustomButton';

function RoleSelection() {
  const [numWolves, setNumWolves] = useState(1);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.players) {
      setPlayers(location.state.players.map(player => ({ name: player, role: '', word: '' })));
    }
  }, [location.state]);

  const handleNumWolvesChange = (event) => {
    setNumWolves(parseInt(event.target.value, 10));
  };

  const assignRolesAndWords = () => {
    // Shuffle the players array
    const shuffledPlayers = [...players];
    for (let i = shuffledPlayers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
    }

    const wordPair = ww_word_list[Math.floor(Math.random() * ww_word_list.length)];

    let wolfCount = 0;
    const playersWithRolesAndWords = shuffledPlayers.map(player => {
      if (wolfCount < numWolves && Math.random() < numWolves / players.length) {
        wolfCount++;
        return { ...player, role: 'wolf', word: wordPair.wolf };
      } else {
        return { ...player, role: 'citizen', word: wordPair.citizens };
      }
    });

    // If not enough wolves were assigned (possible due to random chance), assign remaining wolves
    for (let i = 0; wolfCount < numWolves; i++) {
      if (playersWithRolesAndWords[i].role !== 'wolf') {
        playersWithRolesAndWords[i] = { ...playersWithRolesAndWords[i], role: 'wolf', word: wordPair.wolf };
        wolfCount++;
      }
    }

    return playersWithRolesAndWords;
  };


  // Start the game and navigate to WordDisplay
  const startGame = () => {
    const updatedPlayers = assignRolesAndWords();
    navigate('/word-display', { state: { players: updatedPlayers } });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Number of Wolves:</Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
            type="number"
            value={numWolves}
            onChange={handleNumWolvesChange}
            inputProps={{ min: "1", max: players.length - 1 }}
            margin="normal"
          />

      </Box>
      <ContinueButton onClick={startGame} sx={{ mt: 3 }}>
          Start Game ＞
        </ContinueButton>
    </Box>
  );
}

export default RoleSelection;
