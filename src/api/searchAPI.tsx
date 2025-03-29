import { authAxiosInstance } from '@/lib/axiosInstance';
import {
  fetchRelatedWorksProps,
  fetchSearchMoviesProps,
} from '@/types/searchPage/searchMovie';

export const fetchSearchMovies = async ({
  query,
  page,
}: fetchSearchMoviesProps) => {
  const response = await authAxiosInstance.get(
    `search/movie?query=${query}&include_adult=false&language=ko&page=${page}`
  );
  return response.data;
};

export const fetchRelatedWorks = async ({
  movieId,
}: fetchRelatedWorksProps) => {
  const response = await authAxiosInstance.get(
    `movie/${movieId}/recommendations?language=ko&page=1`
  );
  return response.data;
};
