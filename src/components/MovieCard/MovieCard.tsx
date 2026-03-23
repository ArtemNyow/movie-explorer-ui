import { Movie } from '../../types/index';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
  onAddToWatchlist: () => void;
  onRemoveFromWatchlist: () => void;
  isInWatchlist: boolean;
}

export function MovieCard({
  movie,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  isInWatchlist,
}: MovieCardProps) {
  return (
    <div className={styles.card}>
      {movie.posterPath ? (
        <img src={movie.posterPath} alt={movie.title} className={styles.poster} />
      ) : (
        <div className={styles.noPoster}>No Image</div>
      )}

      <div className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>

        <div className={styles.meta}>
          <span className={styles.year}>{movie.releaseDate.split('-')[0]}</span>
          <span className={styles.type}>{movie.mediaType}</span>
        </div>

        <div className={styles.rating}>
          <span className={styles.stars}>⭐</span>
          <span>{movie.rating}</span>
        </div>

        <p className={styles.overview}>{movie.overview}</p>

        <button
          className={`${styles.button} ${isInWatchlist ? styles.removeBtn : styles.addBtn}`}
          onClick={isInWatchlist ? onRemoveFromWatchlist : onAddToWatchlist}
        >
          {isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
        </button>
      </div>
    </div>
  );
}
