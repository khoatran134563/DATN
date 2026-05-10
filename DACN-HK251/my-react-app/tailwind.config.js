// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'blob-fast': "blob 3s infinite ease-in-out",   // Nhanh (3s)
        'blob-medium': "blob 6s infinite ease-in-out", // Vừa (6s)
        'blob-slow': "blob 9s infinite ease-in-out",   // Chậm (9s)
        "fade-in": "fadeIn 0.5s ease-out", 
      },
      keyframes: {
        blob: { 
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(300px, -150px) scale(1.5)" }, 
          "66%": { transform: "translate(-200px, 200px) scale(0.8)" }, 
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}