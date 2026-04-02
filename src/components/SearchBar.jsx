import React from 'react';

export default function SearchBar({ query, setQuery, filters, setFilters, onSearch }) {
  return (
    <div className="controls">
      <input 
        placeholder="Search movie..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      />
      <input 
        type="number" 
        placeholder="Min Year" 
        onChange={(e) => setFilters({...filters, yearMin: e.target.value})} 
      />
      <select onChange={(e) => setFilters({...filters, type: e.target.value})}>
        <option value="">All Types</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
      </select>
      <button onClick={onSearch}>Search</button>
    </div>
  );
}