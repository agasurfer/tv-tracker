import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import MyShowsPage from './pages/MyShowsPage';
import ShowPage from './pages/ShowPage';
import EpisodesListPage from './pages/EpisodesListPage';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/my-shows" element={ <MyShowsPage /> } />
          <Route path="/show-page/:id" element={ <ShowPage /> } />
          <Route path="/episodes-list/:id" element={ <EpisodesListPage /> } />
        </Routes>
      </Router>
    
  )
}

export default App