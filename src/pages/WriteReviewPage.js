import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getUserReviews, postReview, updateReview, deleteReview } from '../services/api';
import { FunctionContext } from '../App';
import './WriteReviewPage.css';

function WriteReviewPage() {
  const { id } = useParams();
  const [userReview, setUserReview] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const { withLoading, user } = useContext(FunctionContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect (() => {
    withLoading(async () => {
      if(user) {
        const userReviewsResponse = await getUserReviews();
        const existingReview = userReviewsResponse.find(review => review.item_id === id);

        setUserReview(existingReview);

        if(existingReview) {
          setReview(existingReview.review);
          setRating(existingReview.rating);
        }
      }
    });
  }, [withLoading, id, user]);

  const handleNavigate = () => {
    if (location.state?.from === 'UserReviews') {
      navigate('/myreviews');
    } else {
      navigate(`/item/${id}`);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete")) return;

    await withLoading(async () => {
      await deleteReview(userReview.id);
      handleNavigate();
    });
  };
  
  const handleSumbit = async () => {
    await withLoading(async () => {
      if (userReview) {
        await updateReview(userReview.id, rating, review);
      } else {
        await postReview(id, rating, review);
      }
      handleNavigate();
    });
  };

  return (
    <div className="ItemReviewsPage">
      {userReview &&
        <button
          type="button"
          className="delete-review-btn"
          onClick={handleDelete}
        >
          DELETE REVIEW  
        </button>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSumbit();
        }}
      >
        <label htmlFor="rating">Choose Rating:</label>
        <div className="rating-selector">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              className={star <= rating ? "filled-star" : "empty-star"}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <label htmlFor="review">Write Review:</label>
        <textarea 
          id="review" 
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button type="submit">
          {userReview ? "UPDATE REVIEW" : "POST REVIEW"}
        </button>
      </form>
    </div>
  )
}

export default WriteReviewPage;