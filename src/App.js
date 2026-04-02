import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieModal from './components/MovieModal';
import './style.css';

const API_KEY = "6232ea3f";

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filters, setFilters] = useState({ yearMin: '', type: '' });

  const searchMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
      const data = await res.json();
      setMovies(data.Search || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = async (id) => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
    const data = await res.json();
    setSelectedMovie(data);
  };

  const filteredMovies = movies.filter(m => {
    const year = parseInt(m.Year);
    return (!filters.yearMin || year >= filters.yearMin) && (!filters.type || m.Type === filters.type);
  });

  return (
    <div className="container">
      <h1>Movie Database</h1>
      
      <SearchBar 
        query={query} 
        setQuery={setQuery} 
        filters={filters} 
        setFilters={setFilters} 
        onSearch={searchMovies} 
      />

      <div className="movies">
        {loading ? <div className="skeleton" /> : filteredMovies.map(m => (
          <MovieCard key={m.imdbID} movie={m} onClick={() => openDetails(m.imdbID)} />
        ))}
      </div>

      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}