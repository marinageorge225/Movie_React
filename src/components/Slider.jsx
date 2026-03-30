import React, { Component } from "react";
import { motion, AnimatePresence } from "framer-motion";

class Slider extends Component {
  constructor(props) {
    super(props);

    this.slides = [
      {
        src: "/images/10.jpg",
        tag: "Now Showing",
        title: "Ratatouille",
        sub: "A culinary adventure in the heart of Paris",
      },
      {
        src: "/images/11.jpg",
        tag: "Featured",
        title: "Me Before You",
        sub: "A tale of unexpected romance",
      },
      {
        src: "/images/12.jpg",
        tag: "Top Rated",
        title: "LA LA Land ",
        sub: "A musical love story in the city of dreams",
      },
      {
        src: "/images/13.jpg",
        tag: "Must Watch",
        title: "Spiderman",
        sub: "A web-slinging hero's journey through New York City",
      },
    ];

    this.state = { currentIndex: 0, direction: 1 };
    this.timer = null;
  }

  componentDidMount() {
    this.startTimer();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    clearInterval(this.timer);
    this.timer = setInterval(this.next, 5000);
  };

  next = () => {
    this.setState((p) => ({
      currentIndex:
        p.currentIndex === this.slides.length - 1 ? 0 : p.currentIndex + 1,
      direction: 1,
    }));
  };

  prev = () => {
    this.setState((p) => ({
      currentIndex:
        p.currentIndex === 0 ? this.slides.length - 1 : p.currentIndex - 1,
      direction: -1,
    }));
    this.startTimer();
  };

  goTo = (i) => {
    this.setState((p) => ({
      currentIndex: i,
      direction: i > p.currentIndex ? 1 : -1,
    }));
    this.startTimer();
  };

  render() {
    const { currentIndex, direction } = this.state;
    const slide = this.slides[currentIndex];

    const imgVariants = {
      enter: (d) => ({ x: d > 0 ? "100%" : "-100%", scale: 1.06 }),
      center: {
        x: 0,
        scale: 1,
        transition: { duration: 0.9, ease: "easeInOut" },
      },
      exit: (d) => ({
        x: d > 0 ? "-8%" : "8%",
        scale: 0.96,
        opacity: 0,
        transition: { duration: 0.7, ease: "easeInOut" },
      }),
    };

    const textVariants = {
      enter: { opacity: 0, y: 40 },
      center: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: "easeOut", delay: 0.3 },
      },
      exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };

    return (
      <div style={s.root}>
        {/* ── Slides ── */}
        <AnimatePresence custom={direction} mode="sync">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={imgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={s.slide}
          >
            <img src={slide.src} alt={slide.title} style={s.img} />
            {/* layered gradients for depth */}
            <div style={s.gradientBottom} />
            <div style={s.gradientLeft} />
          </motion.div>
        </AnimatePresence>

        {/* ── Text overlay ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={"text-" + currentIndex}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={s.textBlock}
          >
            <p style={s.tag}>✦ &nbsp;{slide.tag}&nbsp; ✦</p>
            <h1 style={s.title}>{slide.title}</h1>
            <p style={s.sub}>{slide.sub}</p>
            <button style={s.cta}>Explore Now</button>
          </motion.div>
        </AnimatePresence>

        {/* ── Slide counter top-right ── */}
        <div style={s.counter}>
          <span style={s.counterCurrent}>
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <span style={s.counterSep} />
          <span style={s.counterTotal}>
            {String(this.slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* ── Arrow buttons ── */}
        <button
          style={{ ...s.arrow, left: "32px" }}
          onClick={() => {
            this.prev();
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fdf6ed"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <button
          style={{ ...s.arrow, right: "32px" }}
          onClick={() => {
            this.next();
            this.startTimer();
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fdf6ed"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        {/* ── Dot indicators bottom-right ── */}
        <div style={s.dots}>
          {this.slides.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => this.goTo(i)}
              style={s.dot}
              animate={{
                width: i === currentIndex ? 32 : 8,
                opacity: i === currentIndex ? 1 : 0.4,
                background: "#fdf6ed",
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* ── Vertical text left edge ── */}
        <div style={s.verticalLabel}>
          CINEMA &nbsp;✦&nbsp; {new Date().getFullYear()}
        </div>
      </div>
    );
  }
}

const s = {
  root: {
    position: "relative",
    width: "100%",
    height: "70vh",
    overflow: "hidden",
    background: "#1a0e07",
  },
  slide: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  gradientBottom: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(26,14,7,0.95) 0%, rgba(26,14,7,0.4) 45%, transparent 100%)",
  },
  gradientLeft: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to right, rgba(26,14,7,0.75) 0%, transparent 60%)",
  },

  // text
  textBlock: {
    position: "absolute",
    bottom: "12%",
    left: "7%",
    zIndex: 10,
    maxWidth: "520px",
  },
  tag: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "5px",
    textTransform: "uppercase",
    color: "rgba(237,217,192,0.7)",
    marginBottom: "16px",
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(3rem, 7vw, 6rem)",
    fontWeight: 300,
    lineHeight: 1.05,
    letterSpacing: "2px",
    color: "#fdf6ed",
    marginBottom: "14px",
  },
  sub: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.95rem",
    fontWeight: 300,
    letterSpacing: "1.5px",
    color: "rgba(253,246,237,0.55)",
    marginBottom: "32px",
  },
  cta: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.8rem",
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: "#fdf6ed",
    background: "transparent",
    border: "1px solid rgba(253,246,237,0.4)",
    padding: "13px 30px",
    borderRadius: "50px",
    cursor: "pointer",
    backdropFilter: "blur(8px)",
    transition: "all 0.3s ease",
  },

  // counter
  counter: {
    position: "absolute",
    top: "36px",
    right: "48px",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  counterCurrent: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "2rem",
    fontWeight: 300,
    color: "#fdf6ed",
    lineHeight: 1,
  },
  counterSep: {
    display: "block",
    width: "28px",
    height: "1px",
    background: "rgba(253,246,237,0.35)",
  },
  counterTotal: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.8rem",
    color: "rgba(253,246,237,0.4)",
    letterSpacing: "2px",
  },

  // arrows
  arrow: {
    position: "absolute",
    bottom: "12%",
    zIndex: 10,
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    border: "1px solid rgba(253,246,237,0.2)",
    background: "rgba(253,246,237,0.08)",
    backdropFilter: "blur(10px)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },

  // dots
  dots: {
    position: "absolute",
    bottom: "36px",
    right: "48px",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  dot: {
    height: "3px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },

  // vertical label
  verticalLabel: {
    position: "absolute",
    left: "-52px",
    top: "50%",
    transform: "rotate(-90deg) translateX(-50%)",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.65rem",
    letterSpacing: "5px",
    textTransform: "uppercase",
    color: "rgba(253,246,237,0.25)",
    zIndex: 10,
    whiteSpace: "nowrap",
  },
};

export default Slider;
