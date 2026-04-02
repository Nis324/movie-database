import React from 'react';

export default function MovieCard({ movie, onClick }) {
  const poster = movie.Poster !== "N/A" 
    ? movie.Poster 
    : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <div className="movie-card" onClick={onClick}>
      <img src={poster} alt={movie.Title} />
      <div className="quick-info">
        <b>{movie.Title}</b>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
}