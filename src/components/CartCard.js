import { Link } from 'react-router-dom';
import './CartCard.css';

function CartCard(props) {
  const { itemId, picture, name, price, quantity, onUpdate } = props;
  return (
    <div className='cart-card'>
      <Link to={`/item/${itemId}`}>
        <img
          loading="lazy"
          className="cart-card-img"
          src={`${process.env.PUBLIC_URL}/assets/item-pictures/${picture}`}
          alt={`${name}`}
        />
        <span className='cart-card-name'>{name}</span>
      </Link>
      <div className="quanity-and-price">
        <span className='qty-change-ctrls'>
          <button className='subtract-btn' onClick={() => onUpdate(itemId, quantity - 1)}>-</button>
          <span className='quantity'>
            {quantity}
          </span>
          <button className='add-btn' onClick={() => onUpdate(itemId, quantity + 1)}>+</button>
        </span>
        <span className='price'>
          {`$${(Number(price.replace('$', '')) * quantity).toFixed(2)}`}
        </span>
      </div>
    </div>
  )
}

export default CartCard;