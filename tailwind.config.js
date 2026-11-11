/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Paleta "Guaíba ao entardecer"
        night: "#0E1620",
        panel: "#16212E",
        line: "#26354A",
        ink: "#E9EEF5",
        mute: "#8A9AB0",
        sunset: "#F2A541",
        live: "#3DD6C3",
        busy: "#FF6B5A",
      },
    },
  },
  plugins: [],
};
