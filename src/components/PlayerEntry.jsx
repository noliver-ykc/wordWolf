import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, List, ListItem, Container, Typography } from '@mui/material';
import { CustomButton, ContinueButton } from './CustomButton';

function PlayerEntry() {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleAddPlayer = () => {
    if (playerName.trim() !== '') {
      setPlayers(prevPlayers => [...prevPlayers, playerName.trim()]);
      setPlayerName('');
    }
  };

  const handleAddPlayerBot = () => {
    setPlayers(prevPlayers => [...prevPlayers, 'PlayerBot']);
  };

  const handleSubmit = () => {
    if (players.length >= 3) {
      navigate('/role-selection', { state: { players } });
    } else {
      alert("Please add at least 3 players.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Add Players</Typography>
      <TextField
        label="Enter player name"
        variant="outlined"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <CustomButton onClick={handleAddPlayer} style={{ marginBottom: '20px' }}>
        ➕ Add Player
      </CustomButton>

      {players.length > 0 && (
        <Typography variant="h6" style={{ marginBottom: '10px' }}>
          {players.length} Player{players.length > 1 ? 's' : ''}
        </Typography>
      )}

      <List>
        {players.map((player, index) => (
          <ListItem key={index}>{player}</ListItem>
        ))}
      </List>
      <Typography variant="subtitle1" sx={{ color: 'grey', mb: 2 }}>
        *Game play requires 3 players or more.
      </Typography>
      <CustomButton onClick={handleAddPlayerBot}>
      ➕ ADD PlayerBot
      </CustomButton>

      <Typography variant="subtitle1" sx={{ color: 'grey', mt: 2, mb: 2 }}>
        *PlayerBot is chosen as wolf or citizen at random.
      </Typography>

      <ContinueButton onClick={handleSubmit}>
        Role Selection ＞
      </ContinueButton>
    </Container>
  );
}

export default PlayerEntry;
