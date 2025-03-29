import { Review } from '@/types/detail/type';

export const movieReviewStar = (reviewData: Review) => {
  const results = reviewData.results;
  if (results.length === 0) return 0;

  const totalRating = results.reduce((sum, item) => {
    const rating = item.author_details?.rating;
    return sum + (rating || 0);
  }, 0);

  const averageRating = totalRating / results.length;
  return (averageRating / 2).toFixed(1);
};
