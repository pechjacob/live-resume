/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
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
            },
            animation: {
                'bounce-slight': 'bounce-slight 2s infinite',
                'scan': 'scan 2s linear infinite',
                'cursor-blink': 'cursor-blink 1s step-end infinite',
            },
            keyframes: {
                'bounce-slight': {
                    '0%, 100%': { transform: 'translateY(-5%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
                    '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
                },
                'scan': {
                    '0%': { backgroundPosition: '0% 0%' },
                    '100%': { backgroundPosition: '0% 100%' },
                },
                'cursor-blink': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                }
            }
        }
    },
    plugins: [
        require('tailwindcss-animate'),
    ],
}
