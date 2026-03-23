import { useState, useEffect, useCallback } from 'react';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { MovieGrid } from '../components/MovieGrid/MovieGrid';
import { Movie } from '../types/index';
import { watchlistService } from '../services/watchlistService';
import styles from './SearchPage.module.css';

export function SearchPage() {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watchlistIds, setWatchlistIds] = useState<Set<number>>(new Set());

  // Load watchlist on mount
  useEffect(() => {
    const watchlist = watchlistService.getAll();
    setWatchlistIds(new Set(watchlist.map((m) => m.id)));
  }, []);

  const handleSearchResults = useCallback((newResults: Movie[], totalPages: number) => {
    setResults(newResults);
  }, []);

  const handleSearchLoading = useCallback((isLoading: boolean) => {
    setLoading(isLoading);
  }, []);

  const handleSearchError = useCallback((err: string | null) => {
    setError(err);
  }, []);

  const handleAddToWatchlist = (movie: Movie) => {
    watchlistService.add(movie);
    setWatchlistIds((prev) => new Set([...prev, movie.id]));
  };

  const handleRemoveFromWatchlist = (movieId: number) => {
    watchlistService.remove(movieId);
    setWatchlistIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(movieId);
      return newSet;
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>🎬 Search Movies & TV Shows</h1>
        <p>Find your next favorite title</p>
      </div>

      <SearchBar
        onResults={handleSearchResults}
        onLoading={handleSearchLoading}
        onError={handleSearchError}
      />

      {error && <div className={styles.error}>⚠️ {error}</div>}

      <MovieGrid
        movies={results}
        loading={loading}
        onAddToWatchlist={handleAddToWatchlist}
        onRemoveFromWatchlist={handleRemoveFromWatchlist}
        watchlistIds={watchlistIds}
      />
    </div>
  );
}
