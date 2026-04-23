import { useState, useEffect, useContext } from 'react';
import ReviewCard from '../components/ReviewCard';
import { useParams } from 'react-router-dom';
import { getItemById, getReviewsByItemId } from '../services/api';
import { FunctionContext } from '../App';
import './ItemPage.css';

function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [reviews, setReivews] = useState([]);
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { handleLoading, updateCartItem, cart } = useContext(FunctionContext);
  
  useEffect(() => {
    const getItem = async () => {
      try {
        handleLoading(true);
        const itemResponse = await getItemById(id);
        setItem(itemResponse);
       // Get the item's reviews once item is set
        const reviewsResponse = await (getReviewsByItemId(id));
        setReivews(reviewsResponse);
      } catch (error) {
        console.log(error);
      } finally {
        handleLoading(false);
      }
    }
    getItem();
  }, [id, handleLoading]);

  // Default quantity to whatever is already in the cart
  useEffect(() => {
    const existingItem = cart.find(item => item.itemId === id);
    if (existingItem) {
      setQuantity(existingItem.quantity);
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [cart, id]);

  const handleAdd = () => {
    updateCartItem(id, quantity);
  };

  return (
    <div>
      {item ? (
        <div className="item-page">
          <img 
            className="item-img"
            src={`${process.env.PUBLIC_URL}/assets/item-pictures/${item.picture}`}
            alt={`${item.name}`}
          />
          <div className="item-details">
            <h2 className="item-heading">{item.name}</h2>
            <div className="price-and-descript">
              <div className="item-price">{item.price}</div>
              <div>{item.description}</div>
            </div>
            <input
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <div className="add-to-cart" onClick={handleAdd}>
              {inCart ? 'UPDATE CART' : 'ADD TO CART'}
            </div>
          </div>
          <div className="reviews-panel">
              <h3>Reviews</h3>
              <div className="reviews-list">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} {...review} />
                ))}
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