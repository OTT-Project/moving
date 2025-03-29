import { fetchSearchMovies } from '@/api/searchAPI';
import { defaultMoviePageType } from '@/types/mainPage/defaultMovie';
import { fetchSearchMoviesProps } from '@/types/searchPage/searchMovie';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useSearch = ({ query }: fetchSearchMoviesProps) => {
  return useInfiniteQuery<defaultMoviePageType>({
    queryKey: ['searchData', query],
    queryFn: ({ pageParam = 1 }) =>
      fetchSearchMovies({ query, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
