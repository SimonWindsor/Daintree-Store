import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { searchItems } from '../services/api.js';
import { FunctionContext } from '../App.js';
import './SearchPage.css';

import ItemCard from '../components/ItemCard.js';

function SearchPage() {
  const { searchQuery } = useParams();
  const [ results, setResults ] = useState([]);

  const { withLoading } = useContext(FunctionContext);

  useEffect(() => {
    withLoading(async () => {
      const searchResponse = await searchItems(searchQuery);
      setResults(searchResponse);
    });
  }, [searchQuery, withLoading]);

  return (
    <div className="SearchPage">
      <h2>Search Results for "{searchQuery}"</h2>
        {results.length !== 0 ? (
          <div className="item-browser">
            {results.map((item) => (
              <ItemCard 
                key={item.id}
                {...item}
              />
            ))}
          </div>
        ) : (
          <div>No results found</div>
        )}
    </div>
  )
}

export default SearchPage;