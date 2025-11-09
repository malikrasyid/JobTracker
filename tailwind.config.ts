// tailwind.config.ts (Correct structure)
import type { Config } from 'tailwindcss'; // Add type for better DX

const config: Config = {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
}

export default config;