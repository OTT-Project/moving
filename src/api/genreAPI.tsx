import { authAxiosInstance } from '@/lib/axiosInstance';
import { fetchGenreMovieProps } from '@/types/genre/genrePage';

// 인기순을떄는 : popularity
// 최신순일때는 : release_date
export const fetchGenreMovie = async ({
  genre,
  year,
  page,
}: fetchGenreMovieProps) => {
  const response = await authAxiosInstance.get('discover/movie', {
    params: {
      language: 'ko-KR',
      sort_by: `popularity.desc`,
      with_genres: genre,
      year,
      page,
    },
  });
  return response.data;
};
