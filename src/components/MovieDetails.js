import React from "react";
import "./MovieDetails.css";
function MovieDetails({ movie, genres }) {
  return (
    <div className="movie-info">
      <h4>{movie.item.title}</h4>
      {genres && genres.length > 0 && (
        <ul className="horizontal-list">
          {genres.map((genre, index) => (
            <li key={index}>{genre.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovieDetails;
