module.exports = {
  content: ["src/**/*.html", "src/**/*.css", "src/**/*.js"],
  theme: {
    extend: {
      borderRadius: {
        circle: "50%",
      },
      boxShadow: {
        button: "2px 2px 0 black",
        "button-hover":
          "2px 2px 0 rgba(0,0,0,.5), 2px 2px 6px 0 rgba(0,0,0,.5)",
        "button-current": "2px 2px 0 currentColor",
        "button-hover-current":
          "2px 2px 0 currentColor, 2px 2px 6px 0 currentColor",
        piece: "1px 1px 1px 2px black",
        high: "2px 4px 16px 4px rgba(0, 0, 0, .25), 2px 4px 8px 4px rgba(0, 0, 0, 0.25)",
        soft: "2px 4px 16px 4px rgba(0, 0, 0, .05), 2px 4px 8px 4px rgba(0, 0, 0, 0.1)",
        "high-dark":
          "2px 4px 16px 4px rgba(0, 0, 0, .75), 2px 4px 16px 8px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        error: "#FF8D8D",
        "error-dark": "#e53f3e",
        ink: "#333333",
        gray: "#808080",
        "light-gray": "#f2f2f2",
      },
      cursor: {
        grab: "grab",
      },
      fontFamily: {
        dnd: [
          "Ubuntu",
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
      padding: {
        "05": "0.125rem",
      },
      width: {
        80: "20rem",
      },
    },
  },
  plugins: [],
};
