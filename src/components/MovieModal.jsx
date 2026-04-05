import React, { useState, useEffect } from 'react';

// 1. The new YouTube API Component
const MovieTrailer = ({ title, year }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      // ---> PUT YOUR ACTUAL YOUTUBE API KEY INSIDE THE QUOTES BELOW <---
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY; 

// (Or use import.meta.env.VITE_YOUTUBE_API_KEY if using Vite); 
      
      if (apiKey === "YOUR_YOUTUBE_API_KEY" || apiKey === "") {
        setErrorMsg("Oops! You forgot to paste your YouTube API Key.");
        setLoading(false);
        return;
      }

      try {
        // We build a search query like: "Inception 2010 official movie trailer"
        const searchQuery = `${title} ${year} official movie trailer`;
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(searchQuery)}&type=video&key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
          setErrorMsg(`API Error: ${data.error.message}`);
          setLoading(false);
          return;
        }

        // Grab the video ID from the very first search result
        if (data.items && data.items.length > 0) {
          setTrailerKey(data.items[0].id.videoId);
        } else {
           setErrorMsg("No trailer found on YouTube for this movie.");
        }
      } catch (error) {
        setErrorMsg("Network error: Could not reach YouTube.");
      } finally {
        setLoading(false);
      }
    };

    if (title) {
      fetchTrailer();
    }
  }, [title, year]);

  if (loading) return <p style={{ color: 'white' }}>Searching YouTube for trailer...</p>;
  if (errorMsg) return <p style={{ color: '#ef4444', textAlign: 'center', padding: '20px' }}>{errorMsg}</p>;
  
  return (
    <iframe 
      src={`https://www.youtube.com/embed/${trailerKey}`} 
      allowFullScreen 
      title={`${title} Trailer`}
      style={{ width: '100%', height: '100%', border: 'none' }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
  );
};

// 2. Your main modal component
export default function MovieModal({ movie, onClose }) {
  const [showPlayer, setShowPlayer] = useState(false);

  if (!movie) return null;

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-body" style={{ width: '100%' }}>
          {showPlayer ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              <div style={{ 
                width: '100%', 
                aspectRatio: '16/9', 
                background: '#000', 
                borderRadius: '12px', 
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* We pass the Title and Year to our new YouTube component */}
                <MovieTrailer title={movie.Title} year={movie.Year} />
              </div>
              
              <button 
                onClick={() => setShowPlayer(false)} 
                style={{ background: '#334155', padding: '12px', fontSize: '16px', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                Back to Details
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <img src={movie.Poster} alt={movie.Title} style={{ width: '250px', borderRadius: '12px', objectFit: 'cover' }} />
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h2 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{movie.Title}</h2>
                <p style={{ fontSize: '1.1rem' }}>⭐ {movie.imdbRating} | {movie.Runtime} | {movie.Year}</p>
                <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>{movie.Plot}</p>
                <p><strong>Cast:</strong> {movie.Actors}</p>
                
                <button 
                  className="watch-btn" 
                  onClick={() => setShowPlayer(true)}
                  style={{ padding: '15px 30px', marginTop: '20px', width: '100%', fontSize: '1.1rem', cursor: 'pointer' }}
                >
                  ▶ WATCH TRAILER
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}