import { gql } from '@apollo/client';

export const SEARCH_QUERY = gql`
  query Search($query: String!, $page: Int) {
    search(query: $query, page: $page) {
      results {
        id
        title
        originalTitle
        overview
        posterPath
        releaseDate
        rating
        mediaType
        popularity
      }
      totalPages
      totalResults
    }
  }
`;
