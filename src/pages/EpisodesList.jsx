import React from 'react';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import './EpisodesList.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EpisodesList = () => {
  return (
    <div className="container">

        <Navbar />
        
        <div className='container episodes-list'>EpisodesList</div>
    
        <Footer />

    </div>
  )
}

export default EpisodesList