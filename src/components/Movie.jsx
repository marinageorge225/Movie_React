import React from "react";

const Movie = ({ movie }) => {
  const styles = {
    card: {
      width: "200px",
      borderRadius: "12px",
      padding: "12px",
      margin: "10px",
      textAlign: "center",
      backgroundColor: "#ffffff",
      boxShadow: "0 6px 15px rgba(0,0,0,0.12)",
      fontFamily: "Arial, sans-serif",
      transition: "0.3s",
    },

    image: {
      width: "100%",
      height: "260px",
      objectFit: "cover",
      borderRadius: "10px",
      marginBottom: "10px",
    },

    year: {
      color: "#3f3f3f",
      fontSize: "17px",
      margin: "4px 0",
    },

    crew: {
      color: "#3f3f3f",
      fontSize: "12px",
      margin: "4px 0",
    },

    title: {
      color: "#111",
      fontSize: "15px",
      fontWeight: "bold",
      margin: "10px 0",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{movie.name}</h2>

      <img src={movie.imageUrl} alt={movie.name} style={styles.image} />

      <p style={styles.year}>Year: {movie.year}</p>
      <p style={styles.crew}>Crew: {movie.crew}</p>
    </div>
  );
};

export default Movie;
