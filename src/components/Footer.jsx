import React, { Component } from "react";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { hoveredLink: null };
  }

  render() {
    const { hoveredLink } = this.state;

    const styles = {
      footer: {
        marginTop: "100px",
        padding: "28px 20px",
        backgroundColor: "rgba(237, 217, 192, 0.5)",
        borderTop: "1px solid rgba(154, 110, 72, 0.25)",
        textAlign: "center",
        fontFamily: "'Jost', sans-serif",
      },

      container: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "24px",
        marginBottom: "16px",
      },

      link: (key) => ({
        color: hoveredLink === key ? "#3B1F0A" : "#9A7050",
        fontSize: "14px",
        cursor: "pointer",
        textDecoration: "none",
        letterSpacing: "0.5px",
        fontWeight: hoveredLink === key ? "500" : "400",
        transition: "all 0.25s ease-in-out",
        borderBottom:
          hoveredLink === key
            ? "1px solid rgba(154, 110, 72, 0.5)"
            : "1px solid transparent",
        paddingBottom: "2px",
      }),

      text: {
        fontSize: "12px",
        color: "#9A7050",
        marginTop: "10px",
        letterSpacing: "0.5px",
      },
    };

    const links = [
      { key: "home", label: "Home" },
      { key: "movies", label: "Movies" },
      { key: "tvshows", label: "TV Shows" },
      { key: "popular", label: "New & Popular" },
      { key: "mylist", label: "My List" },
    ];

    return (
      <div style={styles.footer}>
        <div style={styles.container}>
          {links.map(({ key, label }) => (
            <a
              key={key}
              href="#"
              style={styles.link(key)}
              onMouseEnter={() => this.setState({ hoveredLink: key })}
              onMouseLeave={() => this.setState({ hoveredLink: null })}
            >
              {label}
            </a>
          ))}
        </div>
        <p style={styles.text}>
          © 2026 ReactCourse Clone. All rights reserved.
        </p>
      </div>
    );
  }
}

export default Footer;
