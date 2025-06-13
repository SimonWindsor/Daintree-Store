import { Link } from 'react-router-dom';
import './ItemCard.css';

/* Displays a simple card for basic item information in search results, ot on home screen */
function ItemCard(props) {

  return (
    <Link className="item-card" to={`/item/${props.id}`}>
      <img 
        className="card-img"
        src={`${process.env.PUBLIC_URL}/assets/item-pictures/${props.picture}`}
        alt={`${props.name}`}
      />
      <div className="card-name">{props.name}</div>
      <span>
        <div className="card-price">{props.price}</div>
        <div className="add-to-cart">ADD TO CART</div>
      </span>
      <div className="card-description">{props.description}</div>
    </Link>
  )
}

export default ItemCard;