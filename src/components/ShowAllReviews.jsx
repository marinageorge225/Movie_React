import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Rating,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

/* ===== Theme ===== */
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

/* ===== Review Card ===== */
const ReviewCard = ({ review }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      border: "1px solid",
      borderColor: "rgba(107, 62, 32, 0.18)",
      borderRadius: 3,
      backgroundColor: "#fff8f2",
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        mb: 1,
      }}
    >
      <Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: "#3b1f0a" }}
        >
          {review.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "#9a7050" }}>
          🎬 {review.movie}
        </Typography>
      </Box>
    </Box>

    <Divider sx={{ my: 1.5, borderColor: "rgba(107, 62, 32, 0.1)" }} />

    <Stack direction="row" spacing={3} sx={{ mb: review.review ? 1.5 : 0 }}>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "#9a7050", display: "block", mb: 0.5 }}
        >
          Movie Rating
        </Typography>
        <Rating
          value={review.movieRating}
          readOnly
          size="small"
          icon={<StarIcon fontSize="inherit" />}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
      </Box>

      <Box>
        <Typography
          variant="caption"
          sx={{ color: "#9a7050", display: "block", mb: 0.5 }}
        >
          Website Rating
        </Typography>
        <Rating
          value={review.siteRating}
          readOnly
          size="small"
          icon={<StarIcon fontSize="inherit" />}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
      </Box>
    </Stack>

    {review.review && (
      <Typography
        variant="body2"
        sx={{
          mt: 1.5,
          fontStyle: "italic",
          color: "#5c3318",
          backgroundColor: "rgba(107, 62, 32, 0.05)",
          borderLeft: "3px solid #c8895a",
          pl: 1.5,
          py: 0.5,
          borderRadius: "0 6px 6px 0",
        }}
      >
        "{review.review}"
      </Typography>
    )}
  </Paper>
);

/* ===== Main Page ===== */
const ShowAllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(stored);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", p: 3 }}>
        <Box sx={{ maxWidth: 700, mx: "auto" }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/")}
            sx={{
              mb: 3,
              borderColor: "#6b3e20",
              color: "#6b3e20",
            }}
          >
            Back
          </Button>

          <Typography variant="h4" sx={{ mb: 3 }}>
            All Reviews
          </Typography>

          {reviews.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: "center",
                border: "1px dashed",
                borderColor: "rgba(107, 62, 32, 0.25)",
                borderRadius: 3,
              }}
            >
              <Typography sx={{ color: "#9a7050" }}>
                No reviews yet. Be the first to leave one!
              </Typography>
            </Paper>
          ) : (
            <Stack spacing={2}>
              {reviews.map((r, i) => (
                <ReviewCard key={i} review={r} />
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ShowAllReviews;
