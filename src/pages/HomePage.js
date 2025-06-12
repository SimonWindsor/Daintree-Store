import { useState, useEffect } from 'react';
import { getAllItems, getAllCategories } from '../services/api.js';
import './HomePage.css';

import ItemCard from '../components/ItemCard.js';
import CategoryCard from '../components/CategoryCard.js';

import daintreelogo from '../assets/daintreelogo.png';

function HomePage() {
  const [items, setItems] = useState([]);
  const [catagories, setCatagories] = useState([]);
  const [categoryBrowse, setCategoryBrowse] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await getAllItems();
        setItems(response);
      } catch (error) {
        console.log(error);
      }
    }

    const getCategories = async () => {
      try {
        const response = await getAllCategories();
        setCatagories(response);
        console.log(catagories)
      } catch (error) {
        console.log(error);
      }
    }

    categoryBrowse ? getCategories() : getItems();
  }, [categoryBrowse])

  const handleCategoryChange = (e) => {
    setCategoryBrowse(!categoryBrowse);
  }

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

  const showAllCategories = () => {
    return (
      <div className="category-browser">
        {catagories.map(category => {
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
        {categoryBrowse ? showAllCategories() : showAllItems()}
    </div>
  )
}

export default HomePage;