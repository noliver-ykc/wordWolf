import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import logo from '../images/logo.png';
import { ContinueButton } from './CustomButton';

function Index() {
  const [showRules, setShowRules] = useState(false);
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/player-entry');
  };

  const toggleRules = () => {
    setShowRules(!showRules); // Toggle the display of the rules
  };

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <img src={logo} alt="Game Logo" style={{ maxWidth: '100%', height: 'auto', margin: 'auto' }} />
      <ContinueButton onClick={handleStartClick} sx={{ mt: 3 }}>
        Start Game ＞
      </ContinueButton>
      <ContinueButton onClick={toggleRules} sx={{ mt: 3 }}>
        How to Play ？
      </ContinueButton>
      {showRules && (
        <Box>
          <Typography sx={{ mt: 3 }}>
            <b>Getting Started:</b>
            <br />
            1. Upon launching the app, click "Start Game" to dive into the action.
            <br />
            2. Follow the intuitive on-screen prompts to select the number of players, including the option to add a CPU character. This CPU character can be a formidable addition, as they can take on the role of either a cunning "wolf" or a trustworthy "citizen."
            <br />
            <br />
            <b>Game Overview:</b>
            <br />
            In Word Wolf, each player is entrusted with a secret word. However, here's the twist: a select few, known as "the wolves," receive a word that closely resembles the original.
            <br />
            <br />
            <b>The Thrill of the Game:</b>
            <br />
            - As soon as you hit "Start," the clock starts ticking. Engage in lively discussions and put your detective hats on to unveil the elusive wolf among you. Here's the kicker—the wolf doesn't even know their own identity!
            <br />
            - Collaborate, brainstorm, and share your hunches as you strive to unmask the wolf within the given time limit. Keep an eye out for the CPU character, as their allegiance remains a mystery until the end.
            <br />
            <br />
            <b>Decision Time:</b>
            <br />
            - When the timer winds down, it's time for action. Cast your votes within the group to identify who you believe the wolf is. It's a make-or-break moment!
            <br />
            - But wait, there's a twist! With the CPU character in play, you'll need to be extra cautious. Voting out a fellow citizen could spell disaster. Will your collective wisdom lead to the correct identification of the wolf, or will the cunning wolf or shrewd CPU character manage to pull off the ultimate deception? They will emerge victorious!
            <br />
            <br />
            Word Wolf in your app is all about camaraderie, strategy, and that thrilling sense of mystery. It's an engaging challenge where the wolf might just be closer than you think. Can you outwit the wolf and navigate the enigmatic presence of the CPU character? Enjoy the game!
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Index;
