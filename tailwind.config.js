module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["src/**/*.html", "src/**/*.css", "src/**/*.js"],
  theme: {
    extend: {
      backgroundSize: {
        "80%": "80%",
      },
      boxShadow: {
        button: "2px 2px 0 black",
        piece: "1px 1px 1px 2px black",
      },
      colors: {
        error: "#FF8D8D",
        ink: "#333333",
        gray: "#808080",
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
      },
      opacity: {
        10: ".1",
        15: ".15",
        90: ".9",
      },
      outline: {
        custom: "1px auto #0961E4",
      },
      width: {
        80: "20rem",
      },
    },
  },
  variants: {},
  plugins: [],
};
