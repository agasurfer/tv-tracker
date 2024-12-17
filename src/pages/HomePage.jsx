import React from 'react';
import './HomePage.css';
import Navbar from '../components/Navbar';
import SearchSection from '../components/SearchSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div  className='container' >
        <Navbar />
        <SearchSection />
        <Footer />


    </div>
  )
}

export default HomePage