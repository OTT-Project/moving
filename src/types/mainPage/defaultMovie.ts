//게임 영화 타입 정의
export interface defaultMovieType {
  adult: boolean; // 청불인지 아닌지
  backdrop_path: string; // 영화 배경 이미지
  genre_ids: number[]; // 장르 아이디
  id: number; // 영화 아이디
  original_language: string; // 원작언어
  original_title: string; // 원제
  overview: string; // 줄거리
  popularity: number; // 인기 지수
  poster_path: string; // 포스터 이미지
  release_date: string; // 출시일
  title: string; // 제목
  video: boolean; // 비디오 유무
  vote_average: number; // 평균 평점
  vote_count: number; // 평점 개수
}

export interface defaultMoviePageType {
  page: number; // 페이지번호
  results: defaultMovieType[]; // 영화목록
  total_pages: number;
  total_results: number;
}

export interface fetchMovieIDProps {
  movieId: number;
}
