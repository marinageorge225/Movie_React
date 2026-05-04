// Movies.jsx
import axios from "axios";
import { Component } from "react";
import Movie from "./Movie";

const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGE0MGFjMzRkOWY2MjcwM2NiNzRhNTViN2FkNjk0NyIsIm5iZiI6MTc3NDkwODA1NS43OTAwMDAyLCJzdWIiOiI2OWNhZjI5NzIxZDkwMTRjN2E1YWY0ODUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.akZng3BZ8H2fWFuAAkv8_R_qjwc05eps-5mT5H2CIS4";

const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchTerm: "",
      genre: "All",
      rating: "All",
      isLoading: true,
      error: null,
    };
  }

  handleSearchChange = (e) => this.setState({ searchTerm: e.target.value });
  handleGenreChange = (e) => this.setState({ genre: e.target.value });
  handleRatingChange = (e) => this.setState({ rating: e.target.value });

  matchesGenre = (movie) =>
    this.state.genre === "All" ||
    movie.genre?.toLowerCase() === this.state.genre.toLowerCase();

  matchesRating = (movie) => {
    if (this.state.rating === "All") return true;
    if (this.state.rating === "Good") return movie.rating >= 8;
    if (this.state.rating === "Ok")
      return movie.rating >= 5 && movie.rating < 8;
    return movie.rating < 5;
  };

  matchesSearchTerm = (movie) =>
    movie.name?.toLowerCase().includes(this.state.searchTerm.toLowerCase());

  componentDidMount() {
    axios
      .get("https://api.themoviedb.org/3/trending/movie/week", {
        headers: { Authorization: `Bearer ${TMDB_TOKEN}` },
      })
      .then(({ data }) => {
        const movies = data.results.map((m) => ({
          id: m.id,
          name: m.title,
          genre: GENRE_MAP[m.genre_ids[0]] || "Unknown",
          rating: m.vote_average,
          imageUrl: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
          overview: m.overview,
        }));
        this.setState({ movies, isLoading: false });
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        this.setState({ error: "Failed to load movies.", isLoading: false });
      });
  }

  shouldComponentUpdate() {
    return true;
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    const { movies, searchTerm, genre, rating, isLoading, error } = this.state;

    if (isLoading) return <h2>Loading...</h2>;
    if (error) return <h2>{error}</h2>;

    const filteredMovies = movies.filter(
      (movie) =>
        this.matchesGenre(movie) &&
        this.matchesRating(movie) &&
        this.matchesSearchTerm(movie),
    );

    // Derive unique genres from fetched data for the dropdown
    const availableGenres = [
      "All",
      ...new Set(movies.map((m) => m.genre)),
    ].sort();

    return (
      <div>
        <input
          type="text"
          placeholder="Search movies..."
          className="search-input"
          value={searchTerm}
          onChange={this.handleSearchChange}
        />
        <div className="filter-bar">
          <div className="filter-slot">
            <label>Genre</label>
            <select
              className="filter-dropdown"
              value={genre}
              onChange={this.handleGenreChange}
            >
              {availableGenres.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <div className="filter-bar">
          <div className="filter-slot">
            <label>Rating</label>
            <select
              className="filter-dropdown"
              value={rating}
              onChange={this.handleRatingChange}
            >
              <option>All</option>
              <option>Good</option>
              <option>Ok</option>
              <option>Bad</option>
            </select>
          </div>
        </div>
        <div className="movies-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <Movie key={movie.id} movie={movie} />
            ))
          ) : (
            <h3>No movies match your filters.</h3>
          )}
        </div>
      </div>
    );
  }
}

export default Movies;
