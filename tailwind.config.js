/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'resume-dark': '#1a1a1a',
                'resume-paper': '#fdfdfd',
                'matrix-green': '#0F0',
            },
            screens: {
                'print': { 'raw': 'print' },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        }
    },
    plugins: [],
}
