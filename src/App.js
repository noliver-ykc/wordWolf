import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerEntry from './components/PlayerEntry';
import RoleSelection from './components/RoleSelection';
import WordDisplay from './components/WordDisplay';
import Game from './components/Game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayerEntry />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/word-display" element={<WordDisplay />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
