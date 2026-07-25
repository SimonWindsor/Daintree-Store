import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserReviews, postReview, updateReview, deleteReview } from '../services/api';
import { FunctionContext } from '../App';
import './WriteReviewPage.css';

function WriteReviewPage() {
  const { id } = useParams();
  const [userReview, setUserReview] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const {handleLoading, user} = useContext(FunctionContext);
  const navigate = useNavigate();

  useEffect (() => {
    const loadReview = async () => {
      try {
        handleLoading(true);
        if(user) {
            const userReviewsResponse = await getUserReviews();
            const existingReview = userReviewsResponse.find(review => review.item_id === id);

            setUserReview(existingReview);

            if(existingReview) {
              setReview(existingReview.review);
              setRating(existingReview.rating);
            }
        }
      } catch(error) {
        console.log(error);
      } finally {
        handleLoading(false);
      }
    }

    loadReview();    
  }, [handleLoading, id, user]);

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete");

    if(!confirmed) return;

    try {
      deleteReview(userReview.id);
      navigate(`/item/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSumbit = async () => {
    try {
    if (userReview) {
      await updateReview(userReview.id, rating, review);
    } else {
      await postReview(id, rating, review);
    }

    navigate(`/item/${id}`);
  } catch (error) {
    console.error(error);
  }
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
        <div id="rating">
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