import { authAxiosInstance } from '@/lib/axiosInstance';
import { create } from 'zustand';

type Genre = {
  id: number;
  name: string;
};

interface GenreStore {
  genres: Record<number, string>; // 장르 ID와 이름을 매핑하는 객체
  fetchGenres: () => Promise<void>; // 장르 데이터를 가져오는 비동기 함수
}

export const useGenreStore = create<GenreStore>((set, get) => ({
  genres: {},
  fetchGenres: async () => {
    if (Object.keys(get().genres).length > 0) return;

    const { data } = await authAxiosInstance.get<{ genres: Genre[] }>(
      'genre/movie/list?language=ko'
    );
    const genreMap = data.genres.reduce<Record<number, string>>(
      (map, genre) => {
        map[genre.id] = genre.name;
        return map;
      },
      {}
    );
    set({ genres: genreMap });
  },
}));
