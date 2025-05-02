import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    darkMode: 'class',

    theme: {
        extend: {
            colors: {
                primary: "#03386E",
                bodyText: "#4B5563",
                backgroundColor: "#F8F8EE",
                secondary: "#2563EB",
                tertiary: "#EFF6FF",

                dark: {
                    primary: "#3b82f6",
                    bodyText: "#e5e7eb",
                    backgroundColor: "#1f2937",
                    secondary: "#1d4ed8",
                    tertiary: "#1e40af"
                }
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
