import { authAxiosInstance } from '@/lib/axiosInstance';
import { fetchMovieIDProps } from '@/types/mainPage/defaultMovie';

// 신작 영화들 - 배너 부분
export const fetchRecommendation = async () => {
  const response = await authAxiosInstance.get(
    'movie/now_playing?language=ko&page=1&region=KR'
  );
  return response.data;
};

// 감독 정보
export const fetchDirector = async ({ movieId }: fetchMovieIDProps) => {
  const response = await authAxiosInstance.get(
    `movie/${movieId}/credits?language=ko`
  );
  return response.data;
};

// 비디오 api 가져와서 키값 가져오기
export const fetchVideos = async ({ movieId }: fetchMovieIDProps) => {
  const response = await authAxiosInstance.get(
    `movie/${movieId}/videos?language=ko`
  );
  return response.data;
};

// 키값 가져오면 그 키값으로 iframe으로 동영상 재생 시키면됨
