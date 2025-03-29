import { shuffleArray } from '@/auth/shuffleArray';
import { authAxiosInstance } from '@/lib/axiosInstance';
import {
  defaultMoviePageType,
  defaultMovieType,
} from '@/types/mainPage/defaultMovie';

//이번주 트랜드 GET
export const fetchWeekTrend = async () => {
  const response = await authAxiosInstance.get(
    'trending/movie/week?language=ko'
  );
  return response.data;
};

// 게임원작 영화 GET
export const fetchGameMovie = async () => {
  const response = await authAxiosInstance.get(
    'discover/movie?include_adult=false&include_video=false&language=ko&page=1&sort_by=popularity.desc&with_keywords=818'
  );
  return response.data;
};

// 미개봉 신작영화 GET
export const fetchUpcomingMovie = async () => {
  const response = await authAxiosInstance.get(
    'movie/upcoming?language=ko&page=1&region=KR'
  );
  return response.data;
};

// 인기 영화 TOP 10 GET
export const fetchPopular = async () => {
  const response = await authAxiosInstance.get(
    'movie/popular?language=ko&page=1'
  );
  return response.data;
};

// 명장 시리즈 GET
// movie 타입 지정해야함 -> movie/movie.id 여기에 해당하는 타입지정 해야함
export const fetchSeries = async (): Promise<defaultMoviePageType> => {
  const movies = await fetchPopular();

  const moviesWithCollections = await Promise.all(
    movies.results.map(async (movie: defaultMovieType) => {
      const detail = await authAxiosInstance
        .get(`movie/${movie.id}`)
        .catch(() => null);
      if (detail?.data.belongs_to_collection) {
        return {
          ...movie,
          collection: detail.data.belongs_to_collection,
        };
      }
      return null;
    })
  );

  const filteredMovies = moviesWithCollections.filter(
    (movie) => movie !== null
  );

  return {
    page: 1,
    results: filteredMovies as defaultMovieType[],
    total_pages: movies.total_pages, // fetchPopular에서 받아온 값
    total_results: movies.total_results, // fetchPopular에서 받아온 값
  };
};

// 오늘의 컨텐츠 GET
export const fetchToday = async () => {
  try {
    const response = await authAxiosInstance.get(
      'trending/movie/day?language=ko'
    );

    const trending = response.data.results;

    // 랜덤데이터 반환
    const shuffledTrending = shuffleArray(trending);

    return {
      page: 1,
      results: shuffledTrending,
      total_pages: response.data.total_pages || 1, // API 응답에서 제공되지 않으면 기본값 사용
      total_results: response.data.total_results || shuffledTrending.length,
    };
  } catch (error) {
    console.error('Error fetching trending content:', error);
    return {
      page: 1,
      results: [], // 에러 발생시 빈 배열 반환
      total_pages: 0, // 에러 시 기본값 설정
      total_results: 0, // 에러 시 기본값 설정
    };
  }
};

// 이미지 사용할때 기본 URL
export const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BACK_IMAGE_URL;
