import { fetchUpcomingMovie } from '@/api/mainpageAPI';
import { defaultMoviePageType } from '@/types/mainPage/defaultMovie';
import { useQuery } from '@tanstack/react-query';

export const useUpcomingMovie = () => {
  return useQuery<defaultMoviePageType>({
    queryKey: ['upcomingMovie'],
    queryFn: fetchUpcomingMovie,
  });
};
