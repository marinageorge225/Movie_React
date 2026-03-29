import React, { Component } from "react";

class Header extends Component {
  render() {
    const styles = {
      header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#111",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        position: "sticky",
        top: "0",
        zIndex: "1000",
      },

      logo: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#e50914", // Netflix red
        letterSpacing: "2px",
      },

      nav: {
        display: "flex",
        gap: "20px",
      },

      link: {
        color: "#ddd",
        fontSize: "14px",
        cursor: "pointer",
        textDecoration: "none",
        transition: "0.3s",
      },

      profile: {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        backgroundColor: "#444",
      },
    };

    return (
      <div style={styles.header}>
        <div style={styles.logo}>REACT</div>

        {/* Nav Links */}
        <div style={styles.nav}>
          <a style={styles.link}>Home</a>
          <a style={styles.link}>Movies</a>
          <a style={styles.link}>TV Shows</a>
          <a style={styles.link}>My List</a>
        </div>

        <div style={styles.profile}></div>
      </div>
    );
  }
}

export default Header;
