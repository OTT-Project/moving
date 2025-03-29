import { ReviewResultData } from '@/types/detail/type';
import { useEffect, useState } from 'react';

export const useModalSort = (reviewList: ReviewResultData[]) => {
  const [sortText, setSortText] = useState<string>('최신순');
  const [sortedReviews, setSortedReviews] = useState<ReviewResultData[]>([]);

  const sortReviews = (reviewList: ReviewResultData[], sortText: string) => {
    const sortedList = [...reviewList];

    switch (sortText) {
      case '최신순':
        return sortedList.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case '별점 높은순':
        return sortedList.sort(
          (a, b) =>
            (b.author_details.rating || 0) - (a.author_details.rating || 0)
        );
      case '별점 낮은순':
        return sortedList.sort(
          (a, b) =>
            (a.author_details.rating || 0) - (b.author_details.rating || 0)
        );
      default:
        return sortedList.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  };

  useEffect(() => {
    setSortedReviews(sortReviews(reviewList, '최신순'));
  }, [reviewList]);

  useEffect(() => {
    setSortedReviews(sortReviews(reviewList, sortText));
  }, [sortText]);

  return { sortText, setSortText, sortedReviews };
};
