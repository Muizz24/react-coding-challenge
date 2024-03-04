
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

import SearchBar from '../components/SearchBar'

import styles from '../styles/main.module.css';

const PAGE_LIMIT = 10

function Home() {
    let { page } = useParams();

    const [apiData, setApiData] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [currPage, setCurrPage] = useState(page ?? 1)

    // Query related
    const [query, setQuery] = useState('');
    const [queryLoaded, setQueryLoaded] = useState(false)
    const [queryRes, setQueryRes] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
  
    async function fetchData() {
      try {
        setIsLoading(true)
        const { data: { data, pagination } } = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${currPage}&limit=${PAGE_LIMIT}&fields=id,title,thumbnail`);
        console.log(data)

        setApiData(data);
        setPaginationData(pagination)
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  
    useEffect(() => {
      fetchData();
    }, [currPage]);

    const getArtByTitle = async () => {
        setQueryLoaded(false)
        const { data: { data  } } = await axios.get(`https://api.artic.edu/api/v1/artworks/search?q=${query}`);
        setQueryRes(data);
        setQueryLoaded(true)
    }

    useEffect(() => {
        getArtByTitle()
    }, [query]);

   return (
        <div className={styles.mainContainer}>
            <h2>React Coding Challenge</h2>
            <h4>By Muizz</h4>
            <div className={styles.mainContentContainer}>
                <div className={styles.actions}>
                    <SearchBar searchCallback={setQuery} searchHits={queryRes} searchLoaded={queryLoaded} currPage={currPage} />
                </div>
                {isLoading ? (<h3>Loading Data...</h3>) : (apiData.map(({ id, title, thumbnail }) => {
                    return (
                        <Link to={`/details/${currPage}/${id}`} key={id} className={styles.row}>
                            <img width={24} height={24} src={thumbnail?.lqip} alt={thumbnail?.alt_text}/>
                            <p>{title}</p>
                        </Link>
                    )
                }))}
                <div className={styles.paginationContainer}>
                    {currPage > 1 && <button className={styles.paginationButton} onClick={() => setCurrPage(currPage - 1)}>Prev</button>}
                    <p><b>{`Page ${currPage}`}</b></p>
                    {currPage < paginationData?.total_pages && <button className={styles.paginationButton} onClick={() => setCurrPage(currPage + 1)}>Next</button>}
                </div>
            </div>
        </div>
   );
}
  
export default Home;