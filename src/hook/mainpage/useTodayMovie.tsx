import { fetchToday } from '@/api/mainpageAPI';
import { defaultMoviePageType } from '@/types/mainPage/defaultMovie';
import { useQuery } from '@tanstack/react-query';

export const useTodayMovie = () => {
  return useQuery<defaultMoviePageType>({
    queryKey: ['todayMovie'],
    queryFn: fetchToday,
  });
};
