import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './searchBar.module.css';

const SearchBar = ({ searchCallback, searchHits, searchLoaded, currPage }) => {

  const [isFocused, setIsFocused] = useState(true)

  /**
  * Hook that alerts clicks outside of the passed ref
  */
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsFocused(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  // Map all query results onto search results
  const mapHits = () => {
    return searchHits.map((searchHit, idx) => {
      return <Link to={`/details/${currPage}/${searchHit.id}`} key={idx} onClick={e => {
        setIsFocused(false)
      }} className={styles.searchResultItem}>{searchHit.title}</Link>
    })
  }

  return (
    <div className={styles.searchBarContainer} ref={wrapperRef}>
      <div className={styles.searchContainer} onFocus={e => setIsFocused(true)}>
        <input type="text" id="searchBar" autoComplete="off" placeholder="Search by Title" className={styles.searchBar} onChange={e => searchCallback(e.target.value)} />
        <div className={styles.searchResultsContainer}>
          {searchHits.length > 0 && searchLoaded && isFocused ? mapHits() : <></>}
        </div>
      </div>
    </div>
    )
}

export default SearchBar;