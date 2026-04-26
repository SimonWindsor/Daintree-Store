import './UserReviewCard.css';

function UserReviewCard(props) {
  const { item_name, rating, review, timestamp, item_picture } = props;

  return (
    <div className="user-review-card">
      <img 
        src={`${process.env.PUBLIC_URL}/assets/item-pictures/${item_picture}`}
        alt={`Review for ${item_name}`}
      />
      <div className="user-review-content">
        <h4>{item_name}</h4>
        <div>{rating}/5</div>
        <div>{timestamp}</div>
        <p>{review}</p>
      </div>
    </div>
  )
}

export default UserReviewCard;