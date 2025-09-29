import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { searchItems } from '../services/api.js';
import { FunctionContext } from '../App.js';
import './SearchPage.css';

import ItemCard from '../components/ItemCard.js';

function SearchPage() {
  const { searchQuery } = useParams();
  const [ results, setResults ] = useState([]);

  const { handleLoading } = useContext(FunctionContext);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        handleLoading(true);
        const searchResponse = await searchItems(searchQuery);
        setResults(searchResponse);
      } catch(error) {
        console.error(error);
      } finally {
        handleLoading(false);
      }
    }
    handleSearch();  
  }, [searchQuery, handleLoading]);

  return (
    <div className="SearchPage">
      <h2>Search Results for "{searchQuery}"</h2>
        {results.length !== 0 ? (
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