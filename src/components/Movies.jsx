import Movie from "./Movie";
import { Component } from "react";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchTerm: "",
      genre: "All",
      rating: "All",
    };
  }

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };
  handleGenreChange = (e) => {
    this.setState({ genre: e.target.value });
  };

  handleRatingChange = (e) => {
    this.setState({ rating: e.target.value });
  };

  matchesGenre = (movie) => {
    return (
      this.state.genre === "All" ||
      movie.genre?.toLowerCase() === this.state.genre.toLowerCase()
    );
  };

  matchesRating = (movie) => {
    if (this.state.rating === "All") return true;
    if (this.state.rating === "Good") return movie.rating >= 8;
    if (this.state.rating === "Ok")
      return movie.rating >= 5 && movie.rating < 8;
    return movie.rating < 5;
  };

  matchesSearchTerm = (movie) => {
    return movie.name
      ?.toLowerCase()
      .includes(this.state.searchTerm.toLowerCase());
  };

  render() {
    const filteredMovies = this.state.movies.filter(
      (movie) =>
        this.matchesGenre(movie) &&
        this.matchesRating(movie) &&
        this.matchesSearchTerm(movie),
    );

    if (this.state.movies.length === 0) {
      return <h2>Loading...</h2>;
    }

    return (
      <div>
        <input
          type="text"
          placeholder="Search movies..."
          className="search-input"
          value={this.state.searchTerm}
          onChange={this.handleSearchChange}
        />
        <div className="filter-bar">
          <div className="filter-slot">
            <label>Genre</label>
            <select
              className="filter-dropdown"
              value={this.state.genre}
              onChange={this.handleGenreChange}
            >
              <option>All</option>
              <option>Romance</option>
              <option>Sci-Fi</option>
              <option>Comedy</option>
              <option>Horror</option>
              <option>Animation</option>
              <option>Crime</option>
            </select>
          </div>
        </div>
        <br></br>

        <div className="filter-bar">
          <div className="filter-slot">
            <label>Rating</label>
            <select
              className="filter-dropdown"
              value={this.state.rating}
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
          {filteredMovies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }

  componentDidMount() {
    fetch("/movies.json")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movies: data });
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }

  shouldComponentUpdate() {
    return true;
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
}

export default Movies;
