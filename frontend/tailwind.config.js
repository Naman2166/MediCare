/** @type {import('tailwindcss').Config} */        //version :- 3.4.17
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      colors:{
        'primary':"#5f6FFF"
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(190px,1fr))'
      }
    },
  },
  plugins: [],
}

