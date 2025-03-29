import { fetchGenreMovie } from '@/api/genreAPI';
import { fetchGenreMovieProps } from '@/types/genre/genrePage';
import { defaultMoviePageType } from '@/types/mainPage/defaultMovie';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useGenreMovies = ({ genre, year }: fetchGenreMovieProps) => {
  return useInfiniteQuery<defaultMoviePageType>({
    queryKey: ['genre', genre, year],
    queryFn: ({ pageParam = 1 }) =>
      fetchGenreMovie({ genre, year, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1; // 다음 페이지 번호 반환
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
