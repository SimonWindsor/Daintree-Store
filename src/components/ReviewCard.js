import './ReviewCard.css';

function ReviewCard(props) {
  const { first_name, rating, review, timestamp } = props;
  return (
    <div className='review-card'>
      <div>{rating}</div>
      <div>{timestamp}</div>
      <h4>{`${first_name} says:`}</h4>
      <p>{review}</p>
    </div>
  )
}

export default ReviewCard;