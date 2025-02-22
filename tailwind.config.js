/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        headerBlack: '#222222',
        headerGray: '#9d9d9d',
        bodyWhite : '#f2f2f2' ,
        white : '#ffffff',
        arrow : '#0886c8',
        box: '#d9d9d9',
        button : '#313340' ,
        chatPrompt : '#ebf5fb'
      },
      
      container : {
        center : true ,
        padding : "1rem",
        screens :{
          lg : "1124px" ,
          xl : "1124px" , 
          "2xl" : "1124px",
        }
      }
      },
  },
  plugins: [],
}


