/* import React from 'react'
import { useState } from 'react';
import './ShowCard.css'


const ShowCard = ({shows}) => {

    const [seasonCount, setSeasonCount] = useState(0)
    const [liked, setLiked] = useState(false);

const fetchSeasons = async () => {

    const apiUrlSaisons = ` https://api.tvmaze.com/shows/${shows.show.id}/seasons`
    
    try {
        const response = await fetch(apiUrlSaisons);
        const data = await response.json();
        setSeasonCount(data.length)
        
        

    } catch (error) {
        console.log("Eroor feching seasons", error);
        
    }
}

fetchSeasons()

  const handleLikeToggle = () => {
    setLiked((prevLiked) => !prevLiked);
  };






    const imageUrl = shows.show.image 
  ? (shows.show.image.medium || shows.show.image.original) 
  : 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
  
  return (
    <div className='show-card'>
        <div className="image"><img src={imageUrl} /></div>
         <div
          className={`heart-icon ${liked ? 'liked' : ''}`}
          onClick={handleLikeToggle}
        >
          ❤️
        </div>
        <div className="name"><h1>{shows.show.name}</h1></div>
        <div className='genres'>{shows.show.genres.join("/ ")}</div>
        <div className="saisons">{seasonCount < 2 
        ?<p>{seasonCount} Season</p>
        : <p>{seasonCount} Seasons</p>}</div>

    </div>
  )
}

export default ShowCard */

import React, { useState, useEffect } from 'react';
import './ShowCard.css';

const ShowCard = ({ shows }) => {
  const [seasonCount, setSeasonCount] = useState(0);
  const [liked, setLiked] = useState(false);

  
  useEffect(() => {
    const fetchSeasons = async () => {
      const apiUrlSaisons = `https://api.tvmaze.com/shows/${shows.show.id}/seasons`;

      try {
        const response = await fetch(apiUrlSaisons);
        const data = await response.json();
        setSeasonCount(data.length);
      } catch (error) {
        console.log("Error fetching seasons", error);
      }
    };

    fetchSeasons();
  }, [shows.show.id]); 
 
  const handleLikeToggle = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const imageUrl = shows.show.image
    ? shows.show.image.medium || shows.show.image.original
    : 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';

  return (
    <div className="show-card">
      <div className="image">
        <img src={imageUrl} alt={shows.show.name} />
        
        <div
          className={`heart-icon ${liked ? 'liked' : ''}`}
          onClick={handleLikeToggle}
        >
          {liked ? '❤️' : '🤍'}
        </div>
      </div>
      <div className="name">
        <h1>{shows.show.name}</h1>
      </div>
      <div className="genres">{shows.show.genres.join(' / ')}</div>
      <div className="saisons">
        {seasonCount < 2 ? (
          <p>{seasonCount} Season</p>
        ) : (
          <p>{seasonCount} Seasons</p>
        )}
      </div>
    </div>
  );
};

export default ShowCard;
