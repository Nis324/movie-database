import React, { useState } from 'react';

export default function MovieModal({ movie, onClose }) {
  const [showPlayer, setShowPlayer] = useState(false);

  if (!movie) return null;

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={onClose}>
      {/* We stop the click from closing the modal if they click inside the box */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-body" style={{ width: '100%' }}>
          {showPlayer ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {/* THE FIX: Forcing a 16:9 Aspect Ratio */}
              <div style={{ 
                width: '100%', 
                aspectRatio: '16/9', 
                background: '#000', 
                borderRadius: '12px', 
                overflow: 'hidden' 
              }}>
                <iframe 
               /* This dynamic link uses the specific movie's ID to find the stream */
                 src={`https://vidsrc.me/embed/movie?imdb=${movie.imdbID}`} 
                    allowFullScreen 
                    title="Movie Player"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                   />
                
              </div>
              
              <button 
                onClick={() => setShowPlayer(false)} 
                style={{ background: '#334155', padding: '12px', fontSize: '16px' }}
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
                  style={{ padding: '15px 30px', marginTop: '20px', width: '100%', fontSize: '1.1rem' }}
                >
                  ▶ WATCH NOW
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}