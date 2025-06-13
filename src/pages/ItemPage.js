import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getItemById } from '../services/api';
import './ItemPage.css';

function ItemPage(props) {
  const { id } = useParams();
  const [item, setItem] = useState();
  
  useEffect(() => {
    const getItem = async () => {
      try {  
        const response = await getItemById(id);
        setItem(response);
      } catch (error) {
        console.log(error);
      }
    }

    getItem();
  }, [id])

  // A handleAdd function is to be added here for handling "ADD TO CART" clicks.

  return (
    <div>
      {item ? (
        <div className="item-page">
          <img 
            className="item-img"
            src={`${process.env.PUBLIC_URL}/assets/item-pictures/${item.picture}`}
            alt={`${props.name}`}
          />
          <div className="item-details">
            <h2 className="item-heading">{item.name}</h2>
              <div className="add-to-cart">ADD TO CART</div>
            <div className="price-and-descript">
              <div className="item-price">{item.price}</div>
              <div>{item.description}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>Item not found</div>
      )}
    </div>
  )
}

export default ItemPage;