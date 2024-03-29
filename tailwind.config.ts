import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
            },
            backgroundColor: {
                "primary-green": "#2EAE4E",
                "banner-color": "#212121",
                "secondary-black": "#090909",
                "secondary-gray": "#F7F8F9",
                "secondary-green": "#F7FDF8",
                "secondary-white": "#FAFAFA",
                "tertiary-gray": "#494949"
            },
            borderColor: {
                "green-border": "#2EAE4E",
                "input-border": "#494949",
                "card-border": "#DBE1E7"
            },
            colors: {
                "primary-green": "#2EAE4E",
                "secondary-gray": "#BBBBBB ",
                "secondary-black": "#090909"
            },
            fontFamily: {
                rebond: ['"Rebond Grotesque"', "system-ui"],
                "inter-v": ['"Inter V"']
            }
        }
    },
    plugins: []
}
export default config
