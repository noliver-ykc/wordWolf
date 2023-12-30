import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
import timerUpAudio from '../audio/timerUpAudio.mp3';
import { ContinueButton, CustomButton } from './CustomButton';

function Game() {
  const [timeRemaining, setTimeRemaining] = useState(10); // 180 seconds for 3 minutes
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showVoteButton, setShowVoteButton] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const players = location.state?.players;

  const audio = useMemo(() => new Audio(timerUpAudio), []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let timer;
    if (isTimerActive && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      audio.play().then(() => {
        setShowVoteButton(true);
      }).catch(err => {
        console.error("Audio playback failed:", err);
        setShowVoteButton(true);
      });
    }

    return () => clearTimeout(timer);
  }, [timeRemaining, isTimerActive, audio]);

  const startTimer = () => {
    setIsTimerActive(true);
  };

  const handleVote = () => {
    if (!players) {
      console.error("No players data available");
      return;
    }

    navigate('/result', { state: { players } });
    audio.pause();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Game In Progress</Typography>
      <Typography variant="p">Time Remaining:</Typography>
      <Typography variant="h1">{formatTime(timeRemaining)}</Typography>
      {!isTimerActive && (
        <CustomButton onClick={startTimer}>
          Start Timer
        </CustomButton>
      )}
      {showVoteButton && (
        <ContinueButton onClick={handleVote}>
          Vote ＞
        </ContinueButton>
      )}
    </Box>
  );
}

export default Game;
