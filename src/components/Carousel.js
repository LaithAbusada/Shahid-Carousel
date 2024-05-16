import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import classes from "./Carousel.css";
import MovieDetails from "./MovieDetails";
import CarouselItem from "./CarouselItem";
import Skeleton from "react-loading-skeleton"; // Import the Skeleton component
import "react-loading-skeleton/dist/skeleton.css";

function Carousel() {
  const [movies, setMovies] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null); // State to track selected movie

  useEffect(() => {
    fetch("https://run.mocky.io/v3/227a53a3-8004-4c54-8155-0f14e6714409")
      .then((res) => res.json())
      .then((data) => {
        const items = data.editorialItems;
        setMovies(items);
        setIsPending(false);
      });
  }, []);

  const handleMouseEnter = (movie) => {
    setHoveredMovie(movie);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // Set selected movie when clicked
  };

  const closeModal = () => {
    setSelectedMovie(null); // Clear selected movie when modal is closed
  };

  return (
    <Swiper
      allowTouchMove={!isPending} // Allow touch move only when data is fetched
      slidesPerView={1}
      navigation={true}
      className="slide"
      modules={[Navigation]}
      loop={true}
      spaceBetween={10}
      breakpoints={{
        768: { slidesPerView: 2 },
        1000: { slidesPerView: 3 },
        1500: { slidesPerView: 4 },
      }}
    >
      {/* Conditionally render Skeleton cards when data is pending */}
      {isPending
        ? Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide
              key={index}
              style={{
                marginRight: 40,
                marginLeft: 40,
              }}
            >
              <Skeleton
                baseColor="#272e3a"
                highlightColor="#484848"
                width={400}
                height={220}
                inline={true}
                duration={4}
                style={{ marginRight: 100 }}
              />
            </SwiperSlide>
          ))
        : // Render movie slides when data is fetched
          movies &&
          movies.map((movie, index) => (
            <SwiperSlide
              key={index}
              onMouseEnter={() => handleMouseEnter(movie)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleMovieClick(movie)} // Add onClick event handler
            >
              <CarouselItem
                movie={movie}
                hoveredMovie={hoveredMovie}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            </SwiperSlide>
          ))}
      {/* Conditionally render selected movie details */}
      {selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <MovieDetails
              movie={selectedMovie}
              genres={selectedMovie.item.genres}
            />
          </div>
        </div>
      )}
    </Swiper>
  );
}

export default Carousel;
