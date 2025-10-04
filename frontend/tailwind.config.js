module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                primary: "#12C781",
                secondary: "#63E9DA",
                background: {
                    light: "#F5FAFA",
                    default: "#E8FDFB",
                    dark: "#0B2E2E",
                },
                text: {
                    light: "#4A6A68",
                    default: "#1E3A39",
                    dark: "#0A1E1E",
                },
                accent: "#09A9CB",
                highlight: "#FFD166",
            },
            fontFamily: {
                sans: ["'Exo 2'", "Inter", "sans-serif"],
            },

            backgroundImage: {
                'hela-gradient-light': "linear-gradient(90deg, #34D89F 0%, #7FF3E0 50%, #3ACFE0 100%)",
              },
            
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
