
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';


import styles from '../styles/main.module.css';

function Details() {
    const [apiData, setApiData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    let { id, currPage } = useParams();
  
    async function fetchData() {
      try {
        setIsLoading(true)
        // query based on art id. Additionally only return relevant fields
        const { data: { data } } = await axios.get(`https://api.artic.edu/api/v1/artworks/${id}?fields=dimensions,title,artist_display,date_display,main_reference_number,thumbnail`);

        setApiData(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  
    // Fetch Details on mount
    useEffect(() => {
      fetchData();
    }, []);
  
    return (
        <div className={styles.mainContainer}>
            <h2>React Coding Challenge</h2>
            <h4>By Muizz</h4>
            <div className={styles.mainContentContainer}>
                {isLoading ? (<h3>Loading Data...</h3>) : (
                    <div>
                        <img width={64} height={64} src={apiData.thumbnail?.lqip} alt={apiData.thumbnail?.alt_text}/>
                        <h3>{apiData.title}</h3>
                        <p><b>Artist Display: </b>{apiData.artist_display}</p>
                        <p><b>Date Display: </b>{apiData.date_display}</p>
                        <p><b>Main Reference Number: </b>{apiData.main_reference_number}</p>
                        <p><b>Dimensions: </b> {apiData.dimensions}</p>
                    </div>
                )}
                <div className={styles.paginationContainer}>
                    <Link to={`/${currPage}`} key={id} className={styles.row}>
                        <p><b>{`Back to Page ${currPage}`}</b></p>
                    </Link>
                </div>
            </div>
        </div>
   );
  }
  
export default Details;