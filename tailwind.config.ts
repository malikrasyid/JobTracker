// tailwind.config.ts (Correct structure)
import type { Config } from 'tailwindcss'; // Add type for better DX

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;