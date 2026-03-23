import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { SearchPage } from "../../pages/SearchPage";
import { WatchlistPage } from "../../pages/WatchlistPage";
import { apolloClient } from "../../services/apolloClient";
import styles from "./App.module.css";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <div className={styles.app}>
          <header className={styles.header}>
            <div className={styles.container}>
              <h1 className={styles.logo}>🎬 Movie Explorer</h1>
              <nav className={styles.nav}>
                <Link to="/" className={styles.navLink}>
                  Search
                </Link>
                <Link to="/watchlist" className={styles.navLink}>
                  Watchlist
                </Link>
              </nav>
            </div>
          </header>

          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
            </Routes>
          </main>

          <footer className={styles.footer}>
            <p>
              Data from{" "}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                TMDB API
              </a>
            </p>
          </footer>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
