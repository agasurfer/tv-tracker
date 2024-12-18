import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './ShowPage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const ShowPage = () => {

      const { id } = useParams(); 

     const [showData, setShowData] = useState({});
     const [showCast, setShowCast] = useState({})
      const [seasonCount, setSeasonCount] = useState(0);

     useEffect(() => {
        const fetchById = async () => {
          const apiUrlId = `https://api.tvmaze.com/shows/${id}?embed[]=episodes&embed[]=seasons`;
    
          try {
            const response = await fetch(apiUrlId);
            const data = await response.json();
            setShowData(data);
            setSeasonCount(data._embedded.seasons.length)
            
            
            
            
          } catch (error) {
            console.log("Error fetching show data", error);
          }
        };
        
    
        fetchById();
      }, [id]) ;  

      useEffect(() => {
        const fetchCastById = async () => {
          const apiUrlId = `https://api.tvmaze.com/shows/${id}/cast`;
    
          try {
            const response = await fetch(apiUrlId);
            const data = await response.json();
            setShowCast(data);
           
            
            
            
          } catch (error) {
            console.log("Error fetching show cast", error);
          }
        };
    
        fetchCastById();
      }, [id]) ;  

      const cast = [];

        if (showCast && showCast.length) { 
          const maxCast = Math.min(showCast.length, 5);
          for (let i = 0; i < maxCast ; i++ ) {

        cast.push(showCast[i].person.name);
      }  
    }  

      
      

       const imageUrl = showData.image
    ? showData.image.medium || showData.image.original
    : 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
     
       const formattedGenres = showData.genres 
       ? showData.genres.join("/ ")
       : "Genres not available"

        const formattedCast = cast 
        ? cast.join(", ")
       : "Cast not available" 

       
       

  return (
    <div className='container'>
        <Navbar />
        <div className='container show'>

            <div className='show-name'><h1>{showData.name}</h1></div>
             <div className="show-genres">{formattedGenres}</div>
              <div className="show-seasons"><Link to={`/episodes-list/${showData.id}`}>{seasonCount < 2 
            ? (<p>{seasonCount} Season </p>) 
            : (<p>{seasonCount} Seasons</p>)}</Link></div>
            <div className="show-wrapper">
                
                <div className="show-img"><img src={imageUrl} alt="Show Poster" /></div>
                <div className="show-cast">Cast: {formattedCast}</div>
                <div className="show-summary"><p>{showData.summary ? showData.summary.replace(/<\/?[^>]+(>|$)/g, "") : "No summary available"}</p>
            </div>
           
            
            
            
            
            </div>

        </div>
        <Footer />
    </div>
  )
}

export default ShowPage