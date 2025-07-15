import React, { useState } from 'react';
import Header from './components/Header';
import MovieCard, { Movie } from './components/MovieCard';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setMovies([]);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`http://localhost:4000/movies?searchTerm=${encodeURIComponent(term)}`);
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header searchTerm={searchTerm} onSearchChange={fetchMovies} />
      <main className="movie-list">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </main>
    </div>
  );
}

export default App;
