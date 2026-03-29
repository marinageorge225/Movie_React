import React, { Component } from "react";

class Footer extends Component {
  render() {
    const styles = {
      footer: {
        marginTop: "40px",
        padding: "30px 20px",
        backgroundColor: "#111",
        color: "#aaa",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      },

      container: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px",
        marginBottom: "15px",
      },

      link: {
        color: "#aaa",
        fontSize: "14px",
        cursor: "pointer",
        textDecoration: "none",
      },

      linkHover: {
        color: "#fff",
      },

      text: {
        fontSize: "12px",
        color: "#666",
        marginTop: "10px",
      },
    };

    return (
      <div style={styles.footer}>
        <div style={styles.container}>
          <a href="#" style={styles.link}>
            Home
          </a>
          <a href="#" style={styles.link}>
            Movies
          </a>
          <a href="#" style={styles.link}>
            TV Shows
          </a>
          <a href="#" style={styles.link}>
            New & Popular
          </a>
          <a href="#" style={styles.link}>
            My List
          </a>
        </div>

        <p style={styles.text}>
          © 2026 ReactCourse Clone. All rights reserved.
        </p>
      </div>
    );
  }
}

export default Footer;
