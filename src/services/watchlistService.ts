import { Movie, Watchlist } from '../types/index';

const WATCHLIST_KEY = 'movie-explorer-watchlist';

export const watchlistService = {
  get: (): Watchlist => {
    try {
      const saved = localStorage.getItem(WATCHLIST_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Failed to load watchlist from localStorage', error);
      return {};
    }
  },

  add: (movie: Movie): void => {
    try {
      const watchlist = watchlistService.get();
      watchlist[movie.id] = movie;
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
      console.log(`[WATCHLIST] Added: ${movie.title}`);
    } catch (error) {
      console.error('Failed to add movie to watchlist', error);
    }
  },

  remove: (movieId: number): void => {
    try {
      const watchlist = watchlistService.get();
      delete watchlist[movieId];
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
      console.log(`[WATCHLIST] Removed: ${movieId}`);
    } catch (error) {
      console.error('Failed to remove movie from watchlist', error);
    }
  },

  has: (movieId: number): boolean => {
    const watchlist = watchlistService.get();
    return movieId in watchlist;
  },

  getAll: (): Movie[] => {
    const watchlist = watchlistService.get();
    return Object.values(watchlist);
  },

  clear: (): void => {
    try {
      localStorage.removeItem(WATCHLIST_KEY);
      console.log('[WATCHLIST] Cleared');
    } catch (error) {
      console.error('Failed to clear watchlist', error);
    }
  },
};
