import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './ShowPage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ShowPage = () => {
  const { id } = useParams();

  const [showData, setShowData] = useState({});
  const [showCast, setShowCast] = useState({});
  const [seasonCount, setSeasonCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchById = async () => {
      const apiUrlId = `https://api.tvmaze.com/shows/${id}?embed[]=episodes&embed[]=seasons`;

      try {
        const response = await fetch(apiUrlId);
        const data = await response.json();
        setShowData(data);
        setSeasonCount(data._embedded.seasons.length);
      } catch (error) {
        console.log('Error fetching show data', error);
      }
    };

    const checkIfBookmarked = async () => {
      try {
        const response = await fetch('https://676023f46be7889dc35cdc57.mockapi.io/api/bookmark/shows');
        const bookmarks = await response.json();
        const isBookmarked = bookmarks.some((bookmark) => bookmark.originalId === parseInt(id));
        setLiked(isBookmarked);
      } catch (error) {
        console.error('Error checking bookmarks:', error);
      }
    };

    fetchById();
    checkIfBookmarked();
  }, [id]);

  const handleLikeToggle = async () => {
    if (!liked) {
      // Add to favorites
      const bookmarkData = {
        originalId: showData.id,
        name: showData.name,
        bookmark: '',
        image: showData.image ? showData.image.medium || showData.image.original : null,
        genres: showData.genres,
        status: showData.status,
        seasonCount: seasonCount,
        bookmarkedEpisodes: {}, // For future episode bookmarks
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
    } else {
       const confirmUnlike = window.confirm('Are you sure you want to remove this show from your favorites?');
      if (!confirmUnlike) return;

      // Remove from favorites
      try {
        const response = await fetch('https://676023f46be7889dc35cdc57.mockapi.io/api/bookmark/shows');
        const bookmarks = await response.json();
        const bookmarkToDelete = bookmarks.find((bookmark) => bookmark.originalId === parseInt(id));
       
        if (bookmarkToDelete) {
          await fetch(`https://676023f46be7889dc35cdc57.mockapi.io/api/bookmark/shows/${bookmarkToDelete.id}`, {
            method: 'DELETE',
          });
          console.log('Bookmark removed successfully');
          
          setLiked(false);
        }
      } catch (error) {
        console.error('Error removing bookmark:', error);
      }
    }
  };

  const cast = [];

  if (showCast && showCast.length) {
    const maxCast = Math.min(showCast.length, 5);
    for (let i = 0; i < maxCast; i++) {
      cast.push(showCast[i].person.name);
    }
  }

  const imageUrl = showData.image
    ? showData.image.medium || showData.image.original
    : 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';

  const formattedGenres = showData.genres ? showData.genres.join('/ ') : 'Genres not available';

  const formattedCast = cast ? cast.join(', ') : 'Cast not available';

  return (
    <div className='container'>
      <Navbar />
      <div className='container show'>
        <div className='show-name'>
          <h1>{showData.name}</h1>
        </div>
        <div className='show-genres'>{formattedGenres}</div>
        <div className='show-seasons'>
          <Link to={`/episodes-list/${showData.id}`}>
            {seasonCount < 2 ? <p>{seasonCount} Season</p> : <p>{seasonCount} Seasons</p>}
          </Link>
        </div>
        <div className='show-wrapper'>
          <div className='show-img'>
            <img src={imageUrl} alt='Show Poster' />
            <div
              className={`heart-icon ${liked ? 'liked' : ''}`}
              onClick={handleLikeToggle}
            >
              {liked ? '❤️' : '🤍'}
            </div>
          </div>
          <div className='show-cast'>Cast: {formattedCast}</div>
          <div className='show-summary'>
            <p>
              {showData.summary
                ? showData.summary.replace(/<\/?[^>]+(>|$)/g, '')
                : 'No summary available'}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShowPage;
