import { fetchSeries } from '@/api/mainpageAPI';
import { defaultMoviePageType } from '@/types/mainPage/defaultMovie';
import { useQuery } from '@tanstack/react-query';

export const useSeriesMovie = () => {
  return useQuery<defaultMoviePageType>({
    queryKey: ['seriesMovie'],
    queryFn: fetchSeries,
  });
};
