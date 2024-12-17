import React from 'react';
import { useState, useEffect } from 'react';
import './SearchSection.css';
import ShowCard from './ShowCard';

const SearchSection = () => {

    const [userQuery, setUserQuery] = useState("");
    const [shows, setShows] = useState([])

    const handleInputChange = (e) => {
    const query = e.target.value;
    setUserQuery(query);
  };

  console.log(userQuery);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const apiUrlSearch = ` https://api.tvmaze.com/search/shows?q=${userQuery}`

    try {

        const response = await fetch(apiUrlSearch);
        const data = await response.json()
        setShows(data)
         
    
    } catch (error) {
        console.log("Error fetching shows", error);
        
    }
   
    
  }


  



  return (
    <div className='container search-section'>
        <div className="search"><h2>Which show are you looking for?</h2>
          

            <form 
            className="searchbar"
            onSubmit={handleSubmit}>
            <input type="text" 
            className='searchInput'
            name='searchInput'
            placeholder='Type your show'
            onChange={handleInputChange} />
            <button type="submit"
             >Search</button></form>
        </div>
         <div className="message">{ shows.length > 0 && <p>Here are the results for "{userQuery}" </p>}</div>

        <div className="search-results">
            {shows.map((show) => (

            <ShowCard key= {show.show.id} shows= {show} />

         ))}
        </div>
    </div>
  )
}

export default SearchSection