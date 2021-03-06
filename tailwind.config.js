const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: {
        DEFAULT: "2rem",
        sm: "4rem",
        lg: "6rem",
        xl: "8rem",
        "2xl": "10rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Orbitron", ...defaultTheme.fontFamily.sans],
      },
      height: (theme) => ({
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      }),
    },
    boxShadow: {
      ...defaultTheme.boxShadow,
      gif: "5px 5px 60px 10px rgba(238, 126, 83, 0.5)",
      button1: "0px 0px 10px 1px rgba(255,255,255,0.5)",
      button2: "0px 0px 20px 1px rgba(238, 126, 83, 0.5)",
      button3: "0px 0px 20px 1px rgba(238, 126, 83, 0.5)",
      cardInner: "inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)",
    },
    colors: {
      ...defaultTheme.colors,
      primary: "#ee7e53",
      primaryPale: "rgba(238, 126, 83, 0.5)",
      background: "#F7F1F1",
      text: {
        primary: "#2C2C2C",
        primaryPale: "rgba(0, 0, 0, 0.5)",
        primaryPale2: "rgba(0, 0, 0, 0.75)",
        secondary: "#F7F1F1",
        main: "#ee7e53",
      },
      input: {
        background: "#F7E4E4",
        text: "#2C2C2C",
        placeholder: "rgba(255, 255, 255, 0.75)",
      },
      button: {
        primary: "#ee7e53",
        success: "#8BDD58",
        info: "#47A6FF",
        warning: "#F7AE38",
        danger: "#F788B0",
        control: "#FFFFFF",
      },
      success: "#8BDD58",
      info: "#47A6FF",
      warning: "#F7AE38",
      danger: "#F788B0",
      control: "#FFFFFF",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
