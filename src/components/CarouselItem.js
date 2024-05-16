import React from "react";
import { Link } from "react-router-dom";
import MovieDetails from "./MovieDetails";

const CarouselItem = ({
  movie,
  hoveredMovie,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  return (
    <div className="movie-card">
      <Link
        to={`/movie/${movie.item.id}`}
        style={{ textDecoration: "none" }}
        title={movie.item.title}
      >
        <img
          src={movie.item.image.thumbnailImage}
          alt="Movie"
          title={movie.item.title}
          onMouseEnter={() => handleMouseEnter(movie)}
          onMouseLeave={handleMouseLeave}
        />
      </Link>
      {hoveredMovie === movie && (
        <MovieDetails movie={movie} genres={movie.item.genres} />
      )}
    </div>
  );
};

export default CarouselItem;
