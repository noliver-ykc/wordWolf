import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
import { CustomButton, ContinueButton } from './CustomButton';

function WordDisplay() {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [wordRevealed, setWordRevealed] = useState(false);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.players) {
      setPlayers(location.state.players);
    }
  }, [location.state]);

  const revealWord = () => {
    setWordRevealed(true);
  };

  const handleAcknowledgment = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setWordRevealed(false);
    } else {
      navigate('/game', { state: { players } });
    }
  };

  return (
    <Box>
      <Typography variant="h4">
        Word for {players[currentPlayerIndex]?.name}
      </Typography>
      {wordRevealed ? (
        <Box>
          <Typography>{players[currentPlayerIndex]?.word}</Typography>
          <ContinueButton onClick={handleAcknowledgment}>
            I Remember My Word ＞
          </ContinueButton>
        </Box>
      ) : (
        <CustomButton onClick={revealWord} style={{ marginBottom: '20px' }}>
        Reveal Word
      </CustomButton>
      )}
    </Box>
  );
}

export default WordDisplay;
