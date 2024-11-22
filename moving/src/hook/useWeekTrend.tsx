import { fetchWeekTrend } from '@/api/mainpageAPI';
import { defaultMoviePageType } from '@/types/defaultMovie';
import { useQuery } from '@tanstack/react-query';

export const useWeekTrend = () => {
  return useQuery<defaultMoviePageType>({
    queryKey: ['weeksTrend'],
    queryFn: fetchWeekTrend,
  });
};
