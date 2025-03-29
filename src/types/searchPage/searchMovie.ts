export interface fetchSearchMoviesProps {
  query: string | string[] | undefined;
  page: number;
}

export interface SearchResultProps {
  query: string | string[] | undefined;
  onSearchMovieId: (id: number) => void;
}

export interface fetchRelatedWorksProps {
  movieId: number | null;
}
