import { useState, useEffect, useContext } from 'react';
import { getUserReviews } from '../services/api.js';
import { FunctionContext } from '../App.js';
import UserReviewCard from '../components/UserReviewCard.js';
import './UserReviewsPage.css';

function UserReviewsPage() {
  const [ reviews, setReviews ] = useState([]);
  const { handleLoading } = useContext(FunctionContext);

  useEffect(() => {
    const getReviews = async () => {
      try {
        handleLoading(true);
        const reviewResponse = await getUserReviews();
        console.log('hi');
        console.log(reviewResponse);
        setReviews(reviewResponse);
      } catch (error) {
        console.error(error);
      } finally {
        handleLoading(false);
      }
    }

    getReviews();
  }, [])
  return (
    <div className="UserReviewsSSPage">
      <h2>My Reviews</h2>
      {reviews.length > 0 ? (
        <div className="reviews-container">
          {reviews.map((review) => <UserReviewCard key={review.id} {...review} />)}
        </div>
        ) : (<div>You haven't written any reviews yet.</div>

      )}
    </div>
  )
}

export default UserReviewsPage;