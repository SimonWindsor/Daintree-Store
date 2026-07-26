import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById, getReviewsByItemId, getUserReviews } from '../services/api';
import { FunctionContext } from '../App';
import ReviewCard from '../components/ReviewCard';
import './ItemPage.css';

function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [reviews, setReivews] = useState([]);
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [userReview, setUserReview] = useState(null);
  const { withLoading, updateCartItem, cart, user } = useContext(FunctionContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    withLoading(async () => {
      const itemResponse = await getItemById(id);
      setItem(itemResponse);
      // Get the item's reviews once item is set
      const reviewsResponse = await getReviewsByItemId(id);
      setReivews(reviewsResponse);
      // Checks if current user has reviewed item already
      if(user) {
        const userReviewsResponse = await getUserReviews();
        setUserReview(userReviewsResponse.find(review => review.item_id === itemResponse.id));
      }
    });
  }, [id, withLoading, user]);

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
            <div className="add-to-cart-ctrls">
              <input
                className="qty-select"
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <button className="add-to-cart" onClick={handleAdd}>
                {inCart ? 'UPDATE CART' : 'ADD TO CART'}
              </button>
            </div>
            <button 
              className="review-btn" 
              onClick={() =>
                navigate(`/writereview/${id}`, {
                  state: {from: 'ItemPage'}
                })
              }
            >
              {userReview ? "UPDATE/DELETE REVIEW" : "WRITE REVIEW"}
            </button>
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