import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerEntry from './components/PlayerEntry';
import RoleSelection from './components/RoleSelection';
import WordDisplay from './components/WordDisplay';
import Game from './components/Game';
import Result from './components/Result';
import Index from './components/Index';
import { Container } from '@mui/material';
import "./App.css";

function App() {
  return (
    <Container  sx={{ mt: 5 }} maxWidth="sm" className='app-wrapper'>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/player-entry" element={<PlayerEntry />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/word-display" element={<WordDisplay />} />
          <Route path="/game" element={<Game />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
