import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import logo from '../images/logo.png';
import { ContinueButton } from './CustomButton';

function Index() {
  const navigate = useNavigate();

  // Function to handle click on the Start button
  const handleStartClick = () => {
    navigate('/player-entry');
  };

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}> {/* MUI Box for layout with center alignment */}
      <img src={logo} alt="Game Logo" style={{ maxWidth: '100%', height: 'auto', margin: 'auto' }} />
      {/* <Button
        variant="contained"
        color="primary"
        onClick={handleStartClick}
          // MUI System for margin top
      >
        Start Game
      </Button> */}
      <ContinueButton onClick={handleStartClick} sx={{ mt: 3 }}>
        Start Game ＞
      </ContinueButton>
    </Box>
  );
}

export default Index;
