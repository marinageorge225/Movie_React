import { useState } from "react";
import Movie from "./Movie";

const Movies = () => {
  const [cartoonMovies] = useState([
    {
      id: 1,
      name: "Toy Story",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg",
      year: 1995,
      crew: "John Lasseter",
    },
    {
      id: 2,
      name: "Frozen",
      imageUrl:
        "https://lumiere-a.akamaihd.net/v1/images/p_frozen_18373_3131259c.jpeg?region=0%2C0%2C540%2C810",
      year: 2013,
      crew: "Chris Buck, Jennifer Lee",
    },
    {
      id: 3,
      name: "The Lion King",
      imageUrl:
        "https://lumiere-a.akamaihd.net/v1/images/p_thelionking_19752_1_0b9de87b.jpeg?region=0%2C0%2C540%2C810",
      year: 1994,
      crew: "Roger Allers, Rob Minkoff",
    },
    {
      id: 4,
      name: "Shrek",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Shrek_%282001_animated_feature_film%29.jpg/250px-Shrek_%282001_animated_feature_film%29.jpg",
      year: 2001,
      crew: "Andrew Adamson, Vicky Jenson",
    },
    {
      id: 5,
      name: "Finding Nemo",
      imageUrl:
        "https://lumiere-a.akamaihd.net/v1/images/p_findingnemo_19752_05271d3f.jpeg",
      year: 2003,
      crew: "Andrew Stanton",
    },
    {
      id: 6,
      name: "Spider-Man: Into the Spider-Verse",
      imageUrl:
        "https://www.sonypictures.ca/sites/canada/files/2023-03/DP_4344226_SpiderManIntoTheSpiderVerse_Cover_2000x3000_US_1333x2000_thumbnail-min.jpg",
      year: 2018,
      crew: "Bob Persichetti, Peter Ramsey, Rodney Rothman",
    },
    {
      id: 7,
      name: "Coco",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/9/98/Coco_%282017_film%29_poster.jpg",
      year: 2017,
      crew: "Lee Unkrich",
    },
    {
      id: 8,
      name: "Despicable Me",
      imageUrl:
        "https://play-lh.googleusercontent.com/10M4F-ok0cYTtDz7rEBFUK5WmXm0Tg-vnYhnWIrywcslsz9QgenIMFHOiupKLUNJ1zI",
      year: 2010,
      crew: "Pierre Coffin, Chris Renaud",
    },
  ]);

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // 👈 4 per row
    gap: "20px",
    padding: "20px",
  };

  return (
    <div style={containerStyle}>
      {cartoonMovies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Movies;
