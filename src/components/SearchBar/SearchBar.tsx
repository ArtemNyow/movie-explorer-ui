import { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_QUERY } from "../../graphql/queries";
import { Movie } from "../../types/index";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onResults: (results: Movie[], totalPages: number) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
}

export function SearchBar({ onResults, onLoading, onError }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { data, loading, error } = useQuery(SEARCH_QUERY, {
    variables: { query: debouncedQuery, page: 1 },
    skip: debouncedQuery.trim() === "",
    pollInterval: 0,
  });

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query]);

  useEffect(() => {
    if (!query.trim()) {
      onResults([], 0);
      onError(null);
    }
  }, [query, onResults, onError]);

  useEffect(() => {
    onLoading(loading);
  }, [loading, onLoading]);

  useEffect(() => {
    if (error) {
      const errorMsg = error.message || "Failed to search movies";
      onError(errorMsg);
    } else if (!loading) {
      onError(null);
    }
  }, [error, loading, onError]);

  useEffect(() => {
    if (data?.search) {
      onResults(data.search.results, data.search.totalPages);
    }
  }, [data, onResults]);

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search movies and TV shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />
    </div>
  );
}
