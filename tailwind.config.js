module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["src/**/*.html", "src/**/*.css", "src/**/*.js"],
  theme: {
    extend: {
      borderRadius: {
        circle: "50%",
      },
      boxShadow: {
        button: "2px 2px 0 black",
        piece: "1px 1px 1px 2px black",
        high:
          "2px 4px 16px 4px rgba(0, 0, 0, .25), 2px 4px 8px 4px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        error: "#FF8D8D",
        ink: "#333333",
        "ink-dark": "#212121",
        gray: "#808080",
      },
      cursor: {
        grab: "grab",
      },
      fontFamily: {
        dnd: [
          "Gill Sans",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      inset: {
        4: "1rem",
      },
      margin: {
        "05": ".125rem",
      },
      minHeight: {
        40: "10rem",
      },
      maxWidth: {
        14: "3.5rem",
        20: "5rem",
      },
      opacity: {
        10: ".1",
        15: ".15",
        90: ".9",
      },
      outline: {
        custom: "1px auto #0961E4",
      },
      padding: {
        "05": "0.125rem",
      },
      width: {
        80: "20rem",
      },
    },
  },
  variants: {
    cursor: ["responsive", "hover", "focus"],
  },
  plugins: [],
};
