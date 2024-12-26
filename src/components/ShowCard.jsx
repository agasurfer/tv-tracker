

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

    const checkIfBookmarked = async () => {
      try {
        const response = await fetch('https://676023f46be7889dc35cdc57.mockapi.io/api/bookmark/shows');
        const bookmarks = await response.json();
        const isBookmarked = bookmarks.some(bookmark => bookmark.originalId === shows.show.id);
        setLiked(isBookmarked);
      } catch (error) {
        console.error('Error checking bookmarks:', error);
      }
    };

    fetchSeasons();
    checkIfBookmarked();
  }, [shows.show.id]);

  const handleLikeToggle = async () => {
    if (!liked) {
    
      const bookmarkData = {
    originalId: shows.show.id,
    name: shows.show.name,
    bookmark: "",
    image: shows.show.image ? shows.show.image.medium || shows.show.image.original : null,
    genres: shows.show.genres,
    status: shows.show.status,
    seasonCount: seasonCount,
    bookmarkedEpisodes: {} // Add this empty object for future episode bookmarks
};
      try {
        const response = await fetch('https://676023f46be7889dc35cdc57.mockapi.io/api/bookmark/shows', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookmarkData),
        });
        if (!response.ok) {
          throw new Error('Failed to save bookmark');
        }
        console.log('Bookmark saved successfully');
        setLiked(true);
      } catch (error) {
        console.error('Error saving bookmark:', error);
      }
   
  };

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
      <div className="infos-btn">
        <Link to={`/show-page/${shows.show.id}`}>
          <button>More</button>
        </Link>
      </div>
      
    </div>
  );
};

export default ShowCard;