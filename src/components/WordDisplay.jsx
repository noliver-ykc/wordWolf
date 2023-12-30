import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { CustomButton, ContinueButton } from './CustomButton';

function WordDisplay() {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.players) {
      setPlayers(location.state.players);
    }
  }, [location.state]);

  useEffect(() => {
    // Automatically skip CPU players
    if (players[currentPlayerIndex]?.name === 'CPU') {
      handleNextPlayer();
    }
  }, [currentPlayerIndex, players]);

  const handleNextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      navigate('/game', { state: { players } });
    }
  };

  return (
    <Box>
      {players[currentPlayerIndex]?.name !== 'CPU' && (
        <>
          <Typography variant="h4">
            Word for {players[currentPlayerIndex]?.name}
          </Typography>
          <CustomButton onClick={handleNextPlayer} style={{ marginBottom: '20px' }}>
            Reveal Word
          </CustomButton>
        </>
      )}
    </Box>
  );
}

export default WordDisplay;
