import React from 'react';
import EpisodesList from '../components/EpisodesList';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EpisodesListPage = () => {
  return (
    <div className="container">

        <Navbar />
        <EpisodesList />
        <Footer />

    </div>
  )
}

export default EpisodesListPage