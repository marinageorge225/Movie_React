import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./../styles.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getDetails() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=98a40ac34d9f62703cb74a55b7ad6947`,
        );
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getDetails();
  }, [id]);

  if (isLoading) return <div className="details-state">Loading…</div>;
  if (!movie) return <div className="details-state">No data found.</div>;

  const score = Number(movie.vote_average).toFixed(1);
  const ratingClass =
    movie.vote_average >= 7
      ? "rating-good"
      : movie.vote_average >= 5
        ? "rating-ok"
        : "rating-bad";

  const formatCurrency = (n) => (n ? `$${n.toLocaleString()}` : "N/A");

  return (
    <div className="details-page">
      {/* ── Backdrop ── */}
      {movie.backdrop_path && (
        <div className="details-backdrop">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt=""
            className="details-backdrop-img"
          />
          <div className="details-backdrop-overlay" />
        </div>
      )}

      {/* ── Back ── */}
      <div className="details-nav">
        <Link to="/" className="details-back">
          <span className="details-back-arrow">←</span> Back to Films
        </Link>
      </div>

      {/* ── Hero ── */}
      <div className="details-hero">
        {/* Poster */}
        <div className="details-poster-wrap">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="details-poster"
            />
          ) : (
            <div className="details-poster-placeholder">No Image</div>
          )}
          {/* collection badge */}
          {movie.belongs_to_collection && (
            <div className="details-collection-badge">
              Part of <em>{movie.belongs_to_collection.name}</em>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="details-info">
          {/* Status pill */}
          <span className="details-status-pill">{movie.status}</span>

          <h1 className="details-title">{movie.title}</h1>

          {movie.tagline && (
            <p className="details-tagline">"{movie.tagline}"</p>
          )}

          {/* Genres */}
          <div className="details-genres">
            {movie.genres?.map((g) => (
              <span key={g.id} className="movie-card-genre">
                {g.name}
              </span>
            ))}
          </div>

          {/* Rating row */}
          <div className="details-rating-row">
            <div className={`details-score ${ratingClass}`}>
              <span className="details-score-star">★</span>
              <span className="details-score-num">{score}</span>
              <span className="details-score-denom">/10</span>
            </div>
            <div className="details-votes">
              {movie.vote_count?.toLocaleString()} votes
            </div>
          </div>

          {/* Quick facts strip */}
          <div className="details-facts">
            <div className="details-fact">
              <span className="details-fact-label">Released</span>
              <span className="details-fact-value">{movie.release_date}</span>
            </div>
            <div className="details-fact-sep" />
            <div className="details-fact">
              <span className="details-fact-label">Runtime</span>
              <span className="details-fact-value">{movie.runtime} min</span>
            </div>
            <div className="details-fact-sep" />
            <div className="details-fact">
              <span className="details-fact-label">Language</span>
              <span className="details-fact-value">
                {movie.original_language?.toUpperCase()}
              </span>
            </div>
            <div className="details-fact-sep" />
            <div className="details-fact">
              <span className="details-fact-label">Country</span>
              <span className="details-fact-value">
                {movie.production_countries?.[0]?.name ?? "N/A"}
              </span>
            </div>
          </div>

          {/* Overview */}
          <p className="details-overview">{movie.overview}</p>

          {/* Financials */}
          <div className="details-financials">
            <div className="details-financial-card">
              <span className="details-financial-label">Budget</span>
              <span className="details-financial-value">
                {formatCurrency(movie.budget)}
              </span>
            </div>
            <div className="details-financial-card details-financial-card--revenue">
              <span className="details-financial-label">Box Office</span>
              <span className="details-financial-value">
                {formatCurrency(movie.revenue)}
              </span>
            </div>
          </div>

          {/* Production companies */}
          {movie.production_companies?.length > 0 && (
            <div className="details-production">
              <span className="details-production-label">Production</span>
              <div className="details-production-chips">
                {movie.production_companies.map((c) => (
                  <span key={c.id} className="details-production-chip">
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Website CTA */}
          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noreferrer"
              className="details-website-btn"
            >
              Visit Official Site ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
