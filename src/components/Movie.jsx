import { useState } from "react";
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
  const [showMore, setShowMore] = useState(false);

  const ratingClass =
    movie.rating >= 8
      ? "rating-good"
      : movie.rating >= 6
        ? "rating-ok"
        : "rating-bad";

  const handleError = (e) => {
    e.target.src = "/images/default.jpg";
  };

  const shortOverview =
    movie.overview?.length > 40 ? movie.overview.slice(0, 20) : movie.overview;

  return (
    <div className="movie-card">
      <Link to={`/movieDetails/${movie.id}`}>
        <img src={movie.imageUrl} alt={movie.name} onError={handleError} />
      </Link>

      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.name}</h3>

        <p title={movie.overview} className="movie-card-overview">
          {showMore ? movie.overview : shortOverview}

          {movie.overview?.length > 60 && (
            <span
              onClick={() => setShowMore(!showMore)}
              style={{
                color: "#7a3b2e",
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: "5px",
              }}
            >
              {showMore ? " show less" : " ...more"}
            </span>
          )}
        </p>

        <p className="movie-card-genre">{movie.genre}</p>

        <span className={`movie-card-rating ${ratingClass}`}>
          ⭐ {movie.rating.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default Movie;
