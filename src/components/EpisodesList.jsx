import React from 'react';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import './EpisodesList.css'

const EpisodesList = () => {

    
    const { id } = useParams(); 
    const [episodesBySeason, setEpisodesBySeason] = useState({});
    const [openSeason, setOpenSeason] = useState(null);
  

    useEffect(() => {
        const fetchEpisodes = async () => {
        const apiUrl = `https://api.tvmaze.com/shows/${id}?embed[]=episodes`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

       
            const episodes = data._embedded.episodes;
            const groupedBySeason = episodes.reduce((acc, episode) => {
            const season = episode.season;
                if (!acc[season]) acc[season] = [];
            acc[season].push(episode);
            return acc;
        
        }, {});

        setEpisodesBySeason(groupedBySeason);
        
        } catch (error) {
        console.log('Error fetching episodes:', error);
       
        }
    };

    fetchEpisodes();
    
}, [id]);

    const toggleSeason = (season) => {
    setOpenSeason((prev) => (prev === season ? null : season));
    };

  
return (
    <div className="container episodes-list">
        
        <div className="section-header"><h1>Episodes List</h1></div>

        <div className="seasons-wrapper">
        
        {Object.keys(episodesBySeason).map((season) => (
        
            <div key={season} className="season">
          
            <h2
            className="season-title"
            onClick={() => toggleSeason(season)}
            >Season {season}</h2>

         
        {openSeason === season && 
        (<ul className="episode-list">
        {episodesBySeason[season].map((episode) => (
            <li key={episode.id}>
            <strong>{episode.number}.</strong> {episode.name}
            </li>
        ))}
        </ul>
        )}
        </div>
        ))}
        </div>
    </div>
    );
}

export default EpisodesList