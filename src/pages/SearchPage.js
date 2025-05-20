import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { searchItems } from '../services/api.js';
import './SearchPage.css';

function SearchPage() {
  const { searchQuery } = useParams();
  const [ results, setResults ] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const searchResponse = await searchItems(searchQuery);
        setResults(searchResponse);
      } catch(error) {
        console.log(error);
      }
    }
    handleSearch();  
  }, [searchQuery]);
  

  return (
    <div className="SearchPage">
      <h2>Search Results for "{searchQuery}"</h2>
        {results ? (
          results.map(item => (<div key={item.id}>{item.name}</div>))
        ) : (
          <div>No results found</div>
        )}
      
    </div>
  )
}

export default SearchPage;