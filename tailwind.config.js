module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-dark": "#2a2a2c",
        "gray-seconday": "#fafafb",
        "btn-primary": "#0033ff",
        "navbar-color": "#121214",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
