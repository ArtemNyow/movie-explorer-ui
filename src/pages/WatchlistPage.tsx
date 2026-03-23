import { useState, useEffect } from 'react';
import { Movie } from '../types/index';
import { watchlistService } from '../services/watchlistService';
import { MovieGrid } from '../components/MovieGrid/MovieGrid';
import styles from './WatchlistPage.module.css';

export function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [watchlistIds, setWatchlistIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadWatchlist();
    const handleStorageChange = () => loadWatchlist();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadWatchlist = () => {
    const items = watchlistService.getAll();
    setWatchlist(items);
    setWatchlistIds(new Set(items.map((m) => m.id)));
  };

  const handleRemoveFromWatchlist = (movieId: number) => {
    watchlistService.remove(movieId);
    loadWatchlist();
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>📝 My Watchlist</h1>
        {watchlist.length > 0 && (
          <p>{watchlist.length} item{watchlist.length !== 1 ? 's' : ''} saved</p>
        )}
      </div>

      {watchlist.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emoji}>🎬</p>
          <p className={styles.text}>Your watchlist is empty</p>
          <p className={styles.subtext}>Go to Search page and add some movies or TV shows!</p>
        </div>
      ) : (
        <MovieGrid
          movies={watchlist}
          onRemoveFromWatchlist={handleRemoveFromWatchlist}
          watchlistIds={watchlistIds}
        />
      )}
    </div>
  );
}
