import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import MyShowsPage from './pages/MyShowsPage';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/my-shows" element={ <MyShowsPage /> } />
        </Routes>
      </Router>
    
  )
}

export default App