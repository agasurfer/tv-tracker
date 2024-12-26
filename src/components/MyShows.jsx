import React from 'react'
import { useEffect, useState } from 'react'
import MyShowsCard from './MyShowsCard'
import './MyShows.css'

const MyShows = () => {

   const [myShows, setMyShows] = useState([])

   useEffect(() => {
        const fetchMyShows = async () => {
          const apiUrlId = `https://676023f46be7889dc35cdc57.mockapi.io/api/bookmark/shows`;
    
          try {
            const response = await fetch(apiUrlId);
            const data = await response.json();
            setMyShows(data);
            
            
           
            
            
            
          } catch (error) {
            console.log("Error fetching my shows", error);
          }
        };
    
        fetchMyShows();
      }, []) ;  


      console.log(myShows); 

 

  return (
    <div className='container my-shows'>

      <div className="section-header"><h1>My Shows</h1></div>
     <div className="my-shows-wrapper"> {myShows.map((show) => (
        <MyShowsCard key={show.id} show={show} />
      ))}</div>

    </div>
  )
}

export default MyShows
 




