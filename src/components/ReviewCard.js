import './ReviewCard.css';

function ReviewCard(props) {
  const { first_name, rating, review, timestamp } = props;

  const formatRating = (rating) => {
    return (
      <span className ="stars" aria-label={`Rating: ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} className={star <= rating ? "filled-star" : "empty-star"}>
            ★
          </span>
        ))}
      </span>
    )
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <div className='review-card'>
      <div className="review-rating">{formatRating(rating)}</div>
      <div className="review-date">{formatTimestamp(timestamp)}</div>
      {/* first_name used to determine whther or not first_name exists. This componrnt
      is used on both ItemPage and UserReviewsPage but the latter won't display first_name */}
      {first_name && <div className="review-name">
        <span className="first-name">{first_name}</span> says:
      </div>}
      <p>{review}</p>
    </div>
  )
}

export default ReviewCard;