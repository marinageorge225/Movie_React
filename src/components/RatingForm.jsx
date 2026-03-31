import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Divider,
  Chip,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import RateReviewIcon from "@mui/icons-material/RateReview";

/* ===== Custom Theme ===== */
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6b3e20",
    },
    background: {
      default: "#fdf6ed",
      paper: "#fdf6ed",
    },
    text: {
      primary: "#3b1f0a",
      secondary: "#9a7050",
    },
  },
  shape: {
    borderRadius: 14,
  },
});

/* ===== Star Rating Field ===== */
const StarRatingField = ({ label, required, value, onChange }) => (
  <Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      <Typography variant="caption">{label}</Typography>
      {required && <Chip label="Required" size="small" />}
    </Box>
    <Rating
      value={value}
      onChange={(_, newValue) => onChange(newValue || 0)}
      icon={<StarIcon fontSize="inherit" />}
      emptyIcon={<StarBorderIcon fontSize="inherit" />}
    />
  </Box>
);

/* ===== Main Component ===== */
const RatingForm = ({ movieName = "Dune: Part Two" }) => {
  const [name, setName] = useState("");
  const [movieRating, setMovieRating] = useState(0);
  const [siteRating, setSiteRating] = useState(0);
  const [review, setReview] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  /* Load saved reviews */
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

    const existing = JSON.parse(localStorage.getItem("reviews")) || [];
    const updated = [...existing, newReview];

    localStorage.setItem("reviews", JSON.stringify(updated));
    setReviews(updated);

    setError(false);
    setSuccess("Thank you! Your review was submitted.");

    // Reset form
    setName("");
    setMovieRating(0);
    setSiteRating(0);
    setReview("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", p: 3 }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
          Leave a Review
        </Typography>

        <Paper sx={{ maxWidth: 500, p: 3, mx: "auto" }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* Name */}
            <TextField
              label="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              autoFocus
            />

            <Divider />

            {/* Movie Rating */}
            <StarRatingField
              label={`Rate "${movieName}"`}
              required
              value={movieRating}
              onChange={setMovieRating}
            />

            {/* Website Rating */}
            <StarRatingField
              label="Rate Website"
              required
              value={siteRating}
              onChange={setSiteRating}
            />

            <Divider />

            {/* Review */}
            <TextField
              label="Your Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              fullWidth
              multiline
              minRows={3}
            />

            {/* Error */}
            {error && (
              <Typography color="error">
                Please fill all required fields
              </Typography>
            )}

            {/* Success */}
            {success && (
              <Typography sx={{ color: "green" }}>{success}</Typography>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#6b3e20",
                "&:hover": { backgroundColor: "#5a3218" },
              }}
            >
              Submit
            </Button>
          </Box>
        </Paper>

        {/* Show All Reviews Button */}
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 3 }}>
          <Button
            onClick={() => navigate("/reviews")}
            variant="outlined"
            fullWidth
            startIcon={<RateReviewIcon />}
            sx={{
              borderColor: "#6b3e20",
              color: "#6b3e20",
              py: 1.2,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(107, 62, 32, 0.06)",
                borderColor: "#6b3e20",
              },
            }}
          >
            Show All Reviews ({reviews.length})
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default RatingForm;
