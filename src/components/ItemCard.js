import { Link } from 'react-router-dom';
import './ItemCard.css';

/* Displays a simple card for basic item information in search results, ot on home screen */
function ItemCard(props) {

  return (
    <Link className="item-card" to={`/items/${props.id}`}>
      <img 
        className="card-img"
        src={`${process.env.PUBLIC_URL}/assets/item-pictures/${props.picture}`}
        alt={`${props.name}`}
      />
      <div className="card-name">{props.name}</div>
      <div className="card-price">{props.price}</div>
      <div className="card-description">{props.description}</div>
    </Link>
  )
}

export default ItemCard;