/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            primary: "hsl(238, 40%, 52%)",
            warn: "hsl(358, 79%, 66%)",
            secondary: "hsl(239, 57%, 85%)",
            "red-pale": "hsl(357, 100%, 86%)",
            "blue-dark": "hsl(212, 24%, 26%)",
            "blue-gray": " hsl(211, 10%, 45%)",
            "light-gray": {
                1: "hsl(223, 19%, 93%)",
                2: "hsl(228, 33%, 97%)",
            },
            white: "hsl(0, 0%, 100%)",
            black: "#000",
        },
        extend: {},
    },
    plugins: [],
};
