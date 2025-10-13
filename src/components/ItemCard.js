import { Link } from 'react-router-dom';
import './ItemCard.css';

/* Displays a simple card for basic item information in search results, ot on home screen */
function ItemCard(props) {
  const { id, name, picture, description, price, onAdd } = props;

  const addToCart = () => {
    onAdd(id, 1);
  };

  return (
    <div className="item-card">
      <Link to={`/item/${id}`}>
        <img 
          loading="lazy"
          className="card-img"
          src={`${process.env.PUBLIC_URL}/assets/item-pictures/${picture}`}
          alt={`${name}`}
          />
      </Link>
      <div className="card-name">{name}</div>
      <span>
        <span className="card-price">{price}</span>
        <span className="add-to-cart" onClick={addToCart}>ADD TO CART</span>
      </span>
      <div className="card-description">{description}</div>
    </div>
  )
}

export default ItemCard;