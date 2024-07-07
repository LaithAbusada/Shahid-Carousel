import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CarouselItem from "./CarouselItem";
import "./CarouselItem.css";
import "./MoviePage.css";
import "./MovieDetails.css";
import { Helmet } from "react-helmet-async";
// import "./CarouselItem.css";
const MoviePage = () => {
  const { id } = useParams(); // Retrieve the movie ID from the URL
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/52279fd8-4443-44d7-b938-fe0fb6b4b2ff"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const data = await response.json();
        const movie = data.editorialItems.find(
          (movie) => movie.item.id === parseInt(id)
        );
        setSelectedMovie(movie);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!selectedMovie) {
    return <div>Movie not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>{selectedMovie.item.title}</title>
        <meta name="description" content={selectedMovie.item.description} />
      </Helmet>
      <div className="card">
        <CarouselItem
          movie={selectedMovie}
          hoveredMovie={selectedMovie}
          handleMouseEnter={() => {}}
          handleMouseLeave={() => {}}
        />
      </div>
    </>
  );
};

export default MoviePage;
