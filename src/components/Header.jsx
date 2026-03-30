import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <>
        <header className="header">
          <div className="logo">Screenify</div>

          <nav className="nav">
            <a href="#">Home</a>
            <a href="#">Movies</a>
            <a href="#">TV Shows</a>
            <a href="#">My List</a>
          </nav>
        </header>
      </>
    );
  }
}

export default Header;
