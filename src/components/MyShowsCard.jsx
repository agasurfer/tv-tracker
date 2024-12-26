

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyShowsCard.css';

const MyShowsCard = ({ show }) => {
    const [bookmarkedEpisodes, setBookmarkedEpisodes] = useState([]);

    useEffect(() => {
        const fetchBookmarkedEpisodes = async () => {
            try {
                const response = await fetch('https://676023f46be7889dc35cdc57.mockapi.io/api/bookmark/shows');
                const allBookmarks = await response.json();
                
                // Trouver les données pour cette série
                const seriesBookmark = allBookmarks.find(bookmark => bookmark.originalId === show.originalId);

                if (seriesBookmark && seriesBookmark.bookmarkedEpisodes) {
                    setBookmarkedEpisodes(Object.values(seriesBookmark.bookmarkedEpisodes));
                } else {
                    setBookmarkedEpisodes([]); // Aucun épisode bookmarké
                }
            } catch (error) {
                console.error('Error fetching bookmarked episodes:', error);
            }
        };

        fetchBookmarkedEpisodes();
    }, [show.originalId]);

    const handleStopFollow = async (e) => {
        e.preventDefault();
        const confirmDelete = window.confirm(`Are you sure you want to stop following ${show.name}?`);
        
        if (!confirmDelete) {
            return;
        }

        try {
            // Supprimer la série
            const response = await fetch(`https://676023f46be7889dc35cdc57.mockapi.io/api/bookmark/shows/${show.id}`, {
                method: 'DELETE',
            });

            // Si la série est supprimée avec succès, supprimer aussi tous les épisodes bookmarkés
            if (response.ok) {
                // Supprimer tous les bookmarks d'épisodes associés
                const episodesPromises = bookmarkedEpisodes.map(episode => 
                    fetch(`https://676023f46be7889dc35cdc57.mockapi.io/api/bookmark/shows/${episode.id}`, {
                        method: 'DELETE',
                    })
                );
                
                await Promise.all(episodesPromises);
                location.reload();
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Récupérer le premier épisode bookmarké (si disponible)
    const nextEpisode = bookmarkedEpisodes.length > 0 ? bookmarkedEpisodes[0] : null;

    return (
        <div className='my-shows-card'>
            <div className="my-shows-image">
                <img src={show.image} alt={show.name} />
            </div>
            <div className="my-shows-name">
                <h3>{show.name}</h3>
            </div>
            <div className="my-shows-status">
                <p>{show.status}</p>
            </div>
            <div className="bookmark-infos">
                {nextEpisode ? (
                    <div>
                        <div className="bookmark-intro">Your next episode is:</div>
                        <div className="bookmark-data">
                            <p>
                                Season {nextEpisode.seasonNumber}, Episode {nextEpisode.episodeNumber} - {nextEpisode.episodeName}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p>No Bookmark</p>
                )}
            </div>
            <div className="infos-btn">
                <Link to={`/show-page/${show.originalId}`}>
                    <button>More</button>
                </Link>
            </div>
            <div className="set-bookmark-btn">
                <Link to={`/episodes-list/${show.originalId}`}>
                    <button>Set bookmark</button>
                </Link>
            </div>
            <div className="show-delete-btn">
                <button onClick={handleStopFollow}>
                    Stop following
                </button>
            </div>
        </div>
    );
};

export default MyShowsCard;
