import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // This is where BentoGrid lives
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                obsidian: '#0a0a0a',
                slate: {
                    850: '#141414',
                    950: '#050505',
                }
            },
            fontFamily: {
                sans: ['Inter', 'Geist', 'sans-serif'],
            }
        },
    },
    plugins: [],
};
export default config;