import React from 'react'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MyShows from '../components/MyShows'

const MyShowsPage = () => {
  return (
    
    <div className='container'>
        <Navbar />
        <MyShows />
        <Footer />
    </div>
  )
}

export default MyShowsPage