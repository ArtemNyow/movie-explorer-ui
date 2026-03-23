export type MediaType = 'MOVIE' | 'TV';

export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  posterPath: string | null;
  releaseDate: string;
  rating: number;
  mediaType: MediaType;
  popularity: number;
}

export interface SearchResult {
  results: Movie[];
  totalPages: number;
  totalResults: number;
}

export interface Watchlist {
  [key: number]: Movie;
}
