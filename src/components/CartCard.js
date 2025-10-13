import { Link } from 'react-router-dom';
import './CartCard.css';

function CartCard(props) {
  const { id, picture, name, price, quantity, onUpdate } = props;
  return (
    <div className='cart-card'>
      <Link to={`/item/${id}`}>
        <img
          loading="lazy"
          className="cart-card-img"
          src={`${process.env.PUBLIC_URL}/assets/item-pictures/${picture}`}
          alt={`${name}`}
        />
      </Link>
      <span className='quantity'>
        {quantity}
      </span>
      <span className='qty-change-btns'>
        <button className='subtract-btn' onClick={onUpdate(id, quantity - 1)}>-</button>
        <button className='add-btn' onClick={onUpdate(id, quantity + 1)}>+</button>
      </span>
      <span classname='price'>
        {`$${price * quantity}`}
      </span>
    </div>
  )
}

export default CartCard;