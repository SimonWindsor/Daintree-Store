import { useState, useEffect } from 'react';
import { getAllItems, getAllCategories } from '../services/api.js';
import './HomePage.css';

import ItemCard from '../components/ItemCard.js';
import CategoryCard from '../components/CategoryCard.js';

import daintreelogo from '../assets/daintreelogo.png';

function HomePage(props) {
  /* For containing all items or categories, as well as determining which ones ot browse */
  const [items, setItems] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [categoryBrowse, setCategoryBrowse] = useState(false);

  const { handleLoading } = props;

  /* Depending on categoryBrowse state, use effect will determine which information to
    fetch from daabase */
  useEffect(() => {
    const displayItemsOrCategories = async () => {
      try {
        handleLoading(true);

        if (categoryBrowse) {
          const response = await getAllCategories();
          setCategories(response);
        } else {
          const response = await getAllItems();
          setItems(response);
        }
      } catch (error) {
        console.error(error);
      } finally {
        handleLoading(false);
      }
    };

    displayItemsOrCategories();
  }, [categoryBrowse, handleLoading])

  const handleCategoryChange = (e) => {
    setCategoryBrowse(!categoryBrowse);
  }

  // For showing all items
  const showAllItems = () => {
    return (
      <div className="item-browser">
        {items.map(item => {
          const { id, picture, name, description, price } = item;

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
    )
  }

  // For obtaining item categories and organising them accordingly
  const showAllCategories = () => {
    return (
      <div className="category-browser">
        {categories.map(category => {
          return (
          <CategoryCard
            key={category.category}
            name={category.category}
          />
          )
        })}
      </div>
    )
  }

  return (
    <div className="HomePage">
      <h1>Welcome to</h1>
      <img className="daintree-logo-home" alt="Daintree Logo" src={daintreelogo} />
      <div className="intro">
        <p>Daintree is a mock online store created as a Full-Stack project by Simon Windsor. The items displayed here are not real. But the goal of this project is to create a functional web app that could be implemented into a real E-Commerce platform.</p>

        <p>Browse below, try the search feature, or try and create an account or login. You will also be able to do some simulated shopping!</p>
      </div>
      {/* Determines whether to browse all items or by category */}
      <div className="browse-selector">
        <input 
          type="radio" 
          name="selector" 
          id="select-all" 
          checked={!categoryBrowse}
          onChange={handleCategoryChange}  
        />
        <label id="select-all-label" htmlFor="select-all">Browse All</label>
        <input 
          type="radio" 
          name="selector" 
          id="select-categories" 
          checked={categoryBrowse}
          onChange={handleCategoryChange} 
        />
        <label id="select-categories-label" htmlFor="select-categories">Browse Categories</label>
      </div>
        {/* Displays either all items or by category. Or no items if none found */}
        {items.length === 0 ? <>No items found</> : (
          categoryBrowse ? showAllCategories() : showAllItems()
        )}
    </div>
  )
}

export default HomePage;