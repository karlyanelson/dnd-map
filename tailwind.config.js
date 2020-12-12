module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["src/**/*.html", "src/**/*.css"],
  theme: {
    extend: {
      colors: {
        action: "var(--action)",
        ink: "var(--ink)",
        bg: "var(--bg)",
      },
    },
  },
  variants: {},
  plugins: [],
  experimental: {
    darkModeVariant: true,
  },
  dark: "class",
};
