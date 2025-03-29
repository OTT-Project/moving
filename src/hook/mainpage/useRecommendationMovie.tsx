import { fetchDirector, fetchRecommendation } from '@/api/mainpageBanner';
import { defaultMoviePageType } from '@/types/mainPage/defaultMovie';
import { CreditsType, CrewMember } from '@/types/mainPage/mainbanner';
import { useQuery } from '@tanstack/react-query';

export const useRecommendationMovie = () => {
  return useQuery<defaultMoviePageType>({
    queryKey: ['recommendation'],
    queryFn: fetchRecommendation,
  });
};

export const useDirector = (movieId: number) => {
  return useQuery<CreditsType>({
    queryKey: ['Director', movieId],
    queryFn: () => fetchDirector({ movieId }),
  });
};
