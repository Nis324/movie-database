import React from 'react';

export default function ComparePanel({ compareList, onRemove }) {
  if (compareList.length === 0) return null;

  return (
    <div className="compare-panel">
      <h3 style={{ margin: '0 0 15px 0' }}>Comparing ({compareList.length}/2)</h3>
      <div className="compare-grid">
        {compareList.map(movie => (
          <div key={movie.imdbID} className="compare-item">
            <button className="remove-btn" onClick={() => onRemove(movie.imdbID)}>×</button>
            <img src={movie.Poster} alt={movie.Title} width="80" />
            <div className="compare-info">
              <h4 style={{ margin: '0 0 5px 0', color: 'var(--primary)' }}>{movie.Title}</h4>
              <p style={{ margin: 0 }}>⭐ {movie.imdbRating}</p>
              <p style={{ margin: 0 }}>📅 {movie.Year}</p>
              <p style={{ margin: 0 }}>⏱️ {movie.Runtime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}