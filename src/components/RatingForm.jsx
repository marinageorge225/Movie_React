import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StarRating = ({ label, required, value, onChange }) => (
  <div className="rf-field">
    <label className="rf-label">
      {label} {required && <span className="rf-required">*</span>}
    </label>
    <div className="rf-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`rf-star ${value >= star ? "rf-star--lit" : ""}`}
          onClick={() => onChange(star)}
        >
          ★
        </button>
      ))}
    </div>
  </div>
);

const RatingForm = ({ movieName = "Dune: Part Two" }) => {
  const [name, setName] = useState("");
  const [movieRating, setMovieRating] = useState(0);
  const [siteRating, setSiteRating] = useState(0);
  const [review, setReview] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(stored);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || movieRating === 0 || siteRating === 0) {
      setError(true);
      setSuccess("");
      return;
    }
    const newReview = {
      name: name.trim(),
      movie: movieName,
      movieRating,
      siteRating,
      review: review.trim(),
    };
    const updated = [
      ...(JSON.parse(localStorage.getItem("reviews")) || []),
      newReview,
    ];
    localStorage.setItem("reviews", JSON.stringify(updated));
    setReviews(updated);
    setError(false);
    setSuccess("Thank you! Your review was submitted.");
    setName("");
    setMovieRating(0);
    setSiteRating(0);
    setReview("");
  };

  return (
    <div className="rf-page">
      <h2 className="rf-title">Leave a Review</h2>

      <div className="rf-card">
        <form onSubmit={handleSubmit} className="rf-form">
          <div className="rf-field">
            <label className="rf-label">
              Your Name <span className="rf-required">*</span>
            </label>
            <input
              className="rf-input"
              type="text"
              placeholder="e.g. Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="rf-divider" />

          <StarRating
            label={`Rate "${movieName}"`}
            required
            value={movieRating}
            onChange={setMovieRating}
          />
          <StarRating
            label="Rate this website"
            required
            value={siteRating}
            onChange={setSiteRating}
          />

          <div className="rf-divider" />

          <div className="rf-field">
            <label className="rf-label">
              Your Review <span className="rf-muted">(optional)</span>
            </label>
            <textarea
              className="rf-input rf-textarea"
              placeholder="Share your thoughts…"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
            />
          </div>

          {error && (
            <p className="rf-msg rf-msg--error">
              Please fill in all required fields.
            </p>
          )}
          {success && <p className="rf-msg rf-msg--success">{success}</p>}

          <button type="submit" className="rf-submit">
            Submit Review
          </button>
        </form>
      </div>

      <div className="rf-all-btn-wrap">
        <button className="rf-all-btn" onClick={() => navigate("/reviews")}>
          View All Reviews ({reviews.length})
        </button>
      </div>
    </div>
  );
};

export default RatingForm;
