import { useState, useEffect, useRef } from 'react';
import { getItemsByCategory } from '../services/api.js';
import './CategoryCard.css';

import ItemCard from './ItemCard.js'

function CategoryCard(props) {
  const [items, setItems] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const getCategoryItems = async() => {
      try {
        const response = await getItemsByCategory(props.name);
        setItems(response);
      } catch (error) {
        console.log(error);
      }
    }
    getCategoryItems();
  }, [])

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="category-card">
      <h3>{`${props.name}`}</h3>
      <div className="scroller-container">
        <button className="left-btn" onClick={scrollLeft}>&lt;</button>
        <div className="scroller" ref={scrollRef}>
          {items.map((item) => {
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
        <button className="right-btn" onClick={scrollRight}>&gt;</button>
      </div>
    </div>
  )
}

export default CategoryCard;