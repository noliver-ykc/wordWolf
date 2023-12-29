import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import timerUpAudio from '../audio/timerUpAudio.mp3';

function Game() {
  const [timeRemaining, setTimeRemaining] = useState(180); // 180 seconds for 3 minutes
  const [showVoteButton, setShowVoteButton] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const players = location.state?.players; // Access players from location state

  const audio = useMemo(() => new Audio(timerUpAudio), []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      audio.play().then(() => {
        setShowVoteButton(true);
      }).catch(err => {
        console.error("Audio playback failed:", err);
        setShowVoteButton(true);
      });
    }
  }, [timeRemaining, audio]);

  const handleVote = () => {
    if (!players) {
      console.error("No players data available");
      // Handle error appropriately
      return;
    }

    navigate('/result', { state: { players } });
    audio.pause();
  };

  return (
    <div>
      <h1>Game In Progress</h1>
      {timeRemaining > 0 ? (
        <p>Time Remaining: {formatTime(timeRemaining)}</p>
      ) : (
        showVoteButton && <button onClick={handleVote}>Vote</button>
      )}
      {/* Additional content can be added here */}
    </div>
  );
}

export default Game;
