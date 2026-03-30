import React, { Component } from "react";

class Slider extends Component {
  constructor(props) {
    super(props);

    this.images = [
      "/images/10.jpg",
      "/images/11.jpg",
      "/images/12.jpg",
      "/images/13.jpg",
    ];

    this.state = {
      currentIndex: 0,
    };
  }

  nextSlide = () => {
    this.setState((prevState) => ({
      currentIndex:
        prevState.currentIndex === this.images.length - 1
          ? 0
          : prevState.currentIndex + 1,
    }));
  };

  prevSlide = () => {
    this.setState((prevState) => ({
      currentIndex:
        prevState.currentIndex === 0
          ? this.images.length - 1
          : prevState.currentIndex - 1,
    }));
  };

  // Slider.jsx
  render() {
    return (
      <div className="image-slider">
        {" "}
        {/* ← rename this */}
        <button onClick={this.prevSlide}>⬅</button>
        <img src={this.images[this.state.currentIndex]} alt="slider" />
        <button onClick={this.nextSlide}>➡</button>
      </div>
    );
  }
}

export default Slider;
