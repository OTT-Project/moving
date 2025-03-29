import { fetchPopular } from '@/api/mainpageAPI';
import { defaultMoviePageType } from '@/types/mainPage/defaultMovie';
import { useQuery } from '@tanstack/react-query';

export const usePopularMovie = () => {
  return useQuery<defaultMoviePageType>({
    queryKey: ['popularMovie'],
    queryFn: fetchPopular,
  });
};
