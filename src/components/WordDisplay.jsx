import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
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

  useEffect(() => {
    // Automatically skip PlayerBot players and reset wordRevealed for the next player
    if (players[currentPlayerIndex]?.name === 'PlayerBot') {
      handleNextPlayer();
    } else {
      setWordRevealed(false);  // Reset word reveal for non-PlayerBot players
    }
  }, [currentPlayerIndex, players]);

  const handleNextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      navigate('/game', { state: { players } });
    }
  };

  const revealWord = () => {
    setWordRevealed(true);
  };

  return (
    <Box>
      {players[currentPlayerIndex]?.name !== 'PlayerBot' && (
        <>
          <Typography variant="h4">
            Word for {players[currentPlayerIndex]?.name}
          </Typography>
          {wordRevealed ? (
            <Box>
              <Typography variant="h5">{players[currentPlayerIndex]?.word}</Typography>
              <ContinueButton onClick={handleNextPlayer} sx={{ mt: 2 }}>
                Next Player ＞
              </ContinueButton>
            </Box>
          ) : (
            <CustomButton onClick={revealWord} sx={{ mt: 2 }}>
              Reveal Word
            </CustomButton>
          )}
        </>
      )}
    </Box>
  );
}

export default WordDisplay;
