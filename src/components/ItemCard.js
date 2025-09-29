import { Link } from 'react-router-dom';
import './ItemCard.css';

/* Displays a simple card for basic item information in search results, ot on home screen */
function ItemCard(props) {
  const addToCart = () => {
    props.onAdd(props.id, 1);
  };

  return (
    <Link className="item-card" to={`/item/${props.id}`}>
      <img 
        loading="lazy"
        className="card-img"
        src={`${process.env.PUBLIC_URL}/assets/item-pictures/${props.picture}`}
        alt={`${props.name}`}
      />
      <div className="card-name">{props.name}</div>
      <span>
        <span className="card-price">{props.price}</span>
        <span className="add-to-cart" onClick={addToCart}>ADD TO CART</span>
      </span>
      <div className="card-description">{props.description}</div>
    </Link>
  )
}

export default ItemCard;