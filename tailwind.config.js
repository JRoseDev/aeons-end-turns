import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontFamily: {
            'ae-body': ['Charter', 'sans-serif'],
            'ae-title': ['Friz Quadrata', 'serif'],
        },
    },
    darkMode: 'class',
    plugins: [nextui({ addCommonColors: true, defaultTheme: 'dark' })],
};
