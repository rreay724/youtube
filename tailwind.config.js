module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./helpers/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: { mobileXs: "5px", mobileSm: "10px", mobileSm8: "8px" },
      width: { suggestionWidth: "43rem" },
      colors: {
        black: {
          superDuperLight: "#707070",
          superLight: "#333333",
          light: "#292929",
          medium: "#191919",
        },
      },
      screens: {
        "3xl": "1920px",
        "4xl": "2335px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar-hide"),
  ],
};
