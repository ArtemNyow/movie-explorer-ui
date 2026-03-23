import { Movie } from "../../types/index";
import { MovieCard } from '../MovieCard/MovieCard.tsx';
import styles from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  onAddToWatchlist?: (movie: Movie) => void;
  onRemoveFromWatchlist?: (movieId: number) => void;
  watchlistIds?: Set<number>;
}

export function MovieGrid({
  movies,
  loading,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  watchlistIds,
}: MovieGridProps) {
  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.skeleton}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonText} style={{ width: "80%" }} />
          </div>
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No movies or TV shows found. Try a different search!</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard
          key={`${movie.mediaType}-${movie.id}`}
          movie={movie}
          onAddToWatchlist={() => onAddToWatchlist?.(movie)}
          onRemoveFromWatchlist={() => onRemoveFromWatchlist?.(movie.id)}
          isInWatchlist={watchlistIds?.has(movie.id) || false}
        />
      ))}
    </div>
  );
}
