import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import { FunctionContext } from '../App';
import { deleteReview } from '../services/api';
import './UserReviewCard.css';

function UserReviewCard(props) {
  const { id, item_id, item_name, rating, review, timestamp, item_picture, onDelete } = props;
  const navigate = useNavigate();
  const { handleLoading } = useContext(FunctionContext);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete?')) return;

    try {
      handleLoading(true);
      await deleteReview(id);
      onDelete(id);
    } catch (error) {
      console.log(error);
    } finally {
      handleLoading(false);
    }
  }

  return (
    <div className="user-review-card">
      <img 
        className="item-img"
        src={`${process.env.PUBLIC_URL}/assets/item-pictures/${item_picture}`}
        alt={`Review for ${item_name}`}
      />
      <h4>{item_name}</h4>
      <ReviewCard {...{ rating, review, timestamp }} />
      <div className="update-or-delete">
        <button
          className="update-btn"
          onClick={() => 
            navigate(`/writereview/${item_id}`, {
              state: { from: "UserReviews" }
            })
          }
        >
          UPDATE
        </button>
        <button
          className="delete-btn"
          onClick={() => handleDelete()}
        >
          DELETE
        </button>
      </div>
    </div>
  )
}

export default UserReviewCard;