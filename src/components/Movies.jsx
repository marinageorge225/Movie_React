import Movie from "./Movie";
import { Component } from "react";

class Movies extends Component {
  constructor(props) {
    console.log("constructor");
    super(props);
    this.state = {
      movies: [],
    };
  }
  render() {
    console.log("render");

    if (this.state.movies.length === 0) {
      return <h2>Loading...</h2>;
    }

    return (
      <div className="movies-grid">
        {this.state.movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
  componentDidMount() {
    console.log("componentDidMount");

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
    console.log("shouldComponentUpdate");
    return true;
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.movies !== this.state.movies) {
  //     alert("Movies updated!");
  //   }
  // }
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
}
export default Movies;
