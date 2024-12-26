

import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './EpisodesList.css';

const EpisodesList = () => {
    const { id } = useParams();
    const [episodesBySeason, setEpisodesBySeason] = useState({});
    const [openSeason, setOpenSeason] = useState(null);
    const [bookmarkedEpisodes, setBookmarkedEpisodes] = useState({});
    const [showDetails, setShowDetails] = useState(null);
    const [showBookmarkId, setShowBookmarkId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch show details and episodes
                const apiUrl = `https://api.tvmaze.com/shows/${id}?embed[]=episodes`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                setShowDetails(data);
                
                const episodes = data._embedded.episodes;
                const groupedBySeason = episodes.reduce((acc, episode) => {
                    const season = episode.season;
                    if (!acc[season]) acc[season] = [];
                    acc[season].push(episode);
                    return acc;
                }, {});
                setEpisodesBySeason(groupedBySeason);

                // Fetch existing show bookmark
                const bookmarksResponse = await fetch('https://676023f46be7889dc35cdc57.mockapi.io/api/bookmark/shows');
                const bookmarks = await bookmarksResponse.json();
                
                const existingBookmark = bookmarks.find(bookmark => 
                    bookmark.originalId === id || bookmark.originalId === parseInt(id)
                );
                
                if (existingBookmark) {
                    setShowBookmarkId(existingBookmark.id);
                    setBookmarkedEpisodes(existingBookmark.bookmarkedEpisodes || {});
                }

            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const toggleSeason = (season) => {
        setOpenSeason((prev) => (prev === season ? null : season));
    };

    const handleBookmarkToggle = async (newEpisode) => {
        if (!showBookmarkId) {
            const bookmarksResponse = await fetch('https://676023f46be7889dc35cdc57.mockapi.io/api/bookmark/shows');
            const bookmarks = await bookmarksResponse.json();
            const existingBookmark = bookmarks.find(bookmark => 
                bookmark.originalId === id || bookmark.originalId === parseInt(id)
            );
            
            if (existingBookmark) {
                setShowBookmarkId(existingBookmark.id);
            } else {
                console.error('Show must be bookmarked first');
                return;
            }
        }

        const newEpisodeId = newEpisode.id;
        const isCurrentlyBookmarked = bookmarkedEpisodes[newEpisodeId];

        try {
            let updatedBookmarkedEpisodes = {};

            if (!isCurrentlyBookmarked) {
                // Si on clique sur un nouvel épisode, on efface tous les autres et on ne garde que celui-ci
                updatedBookmarkedEpisodes = {
                    [newEpisodeId]: {
                        episodeId: newEpisodeId, 
                        seasonNumber: newEpisode.season,
                        episodeNumber: newEpisode.number,
                        episodeName: newEpisode.name,
                        airDate: newEpisode.airdate
                     } 
                };
            }
            // Si on clique sur l'épisode déjà bookmarké, on le supprime simplement
            // updatedBookmarkedEpisodes reste un objet vide dans ce cas

            // Get current bookmark data
            const getCurrentBookmark = await fetch(`https://676023f46be7889dc35cdc57.mockapi.io/api/bookmark/shows/${showBookmarkId}`);
            const currentBookmark = await getCurrentBookmark.json();
            
            // Update with new bookmarkedEpisodes
            const response = await fetch(`https://676023f46be7889dc35cdc57.mockapi.io/api/bookmark/shows/${showBookmarkId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...currentBookmark,
                    bookmarkedEpisodes: updatedBookmarkedEpisodes
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update bookmark');
            }

            setBookmarkedEpisodes(updatedBookmarkedEpisodes);

        } catch (error) {
            console.error('Error updating bookmark:', error);
        }
    };

    return (
        <div className="container episodes-list">
            <div className="section-header">
                <h1>Episodes List</h1>
            </div>
            <div className="seasons-wrapper">
                {Object.keys(episodesBySeason).map((season) => (
                    <div key={season} className="season">
                        <h2
                            className="season-title"
                            onClick={() => toggleSeason(season)}
                        >
                            Season {season}
                        </h2>
                        {openSeason === season && (
                            <ul className="episode-list">
                                {episodesBySeason[season].map((episode) => (
                                    <li key={episode.id} className="episode-item">
                                        <div className="episode-info">
                                            <strong>{episode.number}.</strong> {episode.name}
                                        </div>
                                        <div 
                                            className="bookmark-icon"
                                            onClick={() => handleBookmarkToggle(episode)}
                                        >
                                            {bookmarkedEpisodes[episode.id] ? 
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#75FB4C">
                                                    <path d="M713-600 600-713l56-57 57 57 141-142 57 57-198 198ZM200-120v-640q0-33 23.5-56.5T280-840h240v80H280v518l200-86 200 86v-278h80v400L480-240 200-120Zm80-640h240-240Z"/>
                                                </svg> : 
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                                    <path d="M200-120v-640q0-33 23.5-56.5T280-840h240v80H280v518l200-86 200 86v-278h80v400L480-240 200-120Zm80-640h240-240Zm400 160v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/>
                                                </svg>
                                            }
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}; 

export default EpisodesList;