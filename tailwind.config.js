module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  plugins: [
    require('@tailwindcss/forms'),
    // Other plugins
  ],
  theme: {
    extend: {
      colors: {
        primary: '#082032', 
        secondary: '#2C394B', 
        tertiary: '#334756',
        quaternary: '#FF4C29',
        quinary: '#FFD166',
        senary: '#06D6A0',
      },
      fontSize: {
        "2xs": ".625rem",
        gridTemplateColumns: {
          24: "repeat(24, minmax(0, 1fr))",
        },
        gridColumn: {
          "span-13": "span 13 / span 13",
          "span-14": "span 14 / span 14",
          "span-15": "span 15 / span 15",
          "span-16": "span 16 / span 16",
          "span-17": "span 17 / span 17",
          "span-18": "span 18 / span 18",
          "span-19": "span 19 / span 19",
          "span-20": "span 20 / span 20",
          "span-21": "span 21 / span 21",
          "span-22": "span 22 / span 22",
          "span-23": "span 23 / span 23",
          "span-24": "span 24 / span 24",
        },
        gridColumnStart: {
          13: "13",
          14: "14",
          15: "15",
          16: "16",
          17: "17",
          18: "18",
          19: "19",
          20: "20",
          21: "21",
          22: "22",
          23: "23",
          24: "24",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
};
