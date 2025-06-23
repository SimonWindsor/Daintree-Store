import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { searchItems } from '../services/api.js';
import './SearchPage.css';

import ItemCard from '../components/ItemCard.js';

function SearchPage(props) {
  const { searchQuery } = useParams();
  const [ results, setResults ] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        props.handleLoading(true);
        const searchResponse = await searchItems(searchQuery);
        setResults(searchResponse);
      } catch(error) {
        console.log(error);
      } finally {
        props.handleLoading(false);
      }
    }
    handleSearch();  
  }, [searchQuery, props]);

  return (
    <div className="SearchPage">
      <h2>Search Results for "{searchQuery}"</h2>
        {results ? (
          <div className="item-browser">
            {results.map((item) => {
              const {id, picture, name, description, price} = item;

              return (
                <ItemCard 
                  key={id}
                  id={id}
                  picture={picture}
                  name={name}
                  description={description}
                  price={price}
                />
              )
            })}
          </div>
        ) : (
          <div>No results found</div>
        )}
    </div>
  )
}

export default SearchPage;