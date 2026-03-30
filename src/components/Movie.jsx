import React from "react";

const Movie = ({ movie }) => {
  // 🎯 decide rating color
  const ratingClass =
    movie.rating >= 8
      ? "rating-good"
      : movie.rating >= 6
        ? "rating-ok"
        : "rating-bad";

  return (
    <div className="movie-card">
      <img src={movie.imageUrl} alt={movie.name} />

      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.name}</h3>

        <p className="movie-card-genre">{movie.genre}</p>

        <span className={`movie-card-rating ${ratingClass}`}>
          ⭐ {movie.rating}
        </span>
      </div>
    </div>
  );
};

export default Movie;
