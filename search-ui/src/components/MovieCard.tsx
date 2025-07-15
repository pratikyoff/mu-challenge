import React from 'react';
import './MovieCard.css';

export interface Movie {
  id: number;
  title: string;
  year: number;
  director?: string | null;
  plot?: string | null;
  poster?: string | null;
}

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <div className="movie-card">
      {movie.poster ? (
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
      ) : (
        <div className="movie-poster placeholder">No Image</div>
      )}
      <div className="movie-info">
        <h3>{movie.title} {movie.year ? `(${movie.year})` : null}</h3>
        {movie.director && (
          <p className="movie-director"><strong>Director:</strong> {movie.director}</p>
        )}
        {movie.plot && <p className="movie-plot">{movie.plot}</p>}
      </div>
    </div>
  );
};

export default MovieCard;
