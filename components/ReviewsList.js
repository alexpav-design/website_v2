import ReviewCard from './ReviewCard';

export default function ReviewsList({ reviews, limit }) {
  const displayedReviews = reviews.slice(0, limit);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {displayedReviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  );
}
