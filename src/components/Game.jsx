import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography, Box, Stack } from '@mui/material';
import timerUpAudio from '../audio/timerUpAudio.mp3';
import { ContinueButton, CustomButton } from './CustomButton';

function Game() {
  const [timeRemaining, setTimeRemaining] = useState(180); // 180 seconds for 3 minutes
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

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  };

  const restartTimer = () => {
    setTimeRemaining(180); // Reset to 3 minutes
    setIsTimerActive(true);
  };

  const addTime = () => {
    setTimeRemaining(prevTime => prevTime + 30);
  };

  const subtractTime = () => {
    setTimeRemaining(prevTime => Math.max(0, prevTime - 30));
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
      <Typography variant="h4" gutterBottom>Discussion Time</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, my: 2 }}>
        <Box>
          <Typography variant="p">Time Remaining:</Typography>
          <Typography variant="h1">{formatTime(timeRemaining)}</Typography>
        </Box>
        <Stack>
          <CustomButton onClick={addTime}>➕ 30s</CustomButton>
          <CustomButton onClick={subtractTime}>− 30s</CustomButton>
        </Stack>
      </Box>
      <Box sx={{ my: 2 }}>
        <CustomButton onClick={toggleTimer}>
          {isTimerActive ? 'Pause Timer' : 'Start Timer'}
        </CustomButton>
        <CustomButton onClick={restartTimer}>
          Restart Timer
        </CustomButton>
      </Box>
      {showVoteButton && (
        <ContinueButton onClick={handleVote} sx={{ mt: 2 }}>
          Vote ＞
        </ContinueButton>
      )}
    </Box>
  );
}

export default Game;
