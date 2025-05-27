/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#F9FAFB",
          surface: "#FFFFFF",
          textPrimary: "#111827",
          textSecondary: "#6B7280",
          border: "#E5E7EB",
          primaryButton: "#8B5CF6",
          primaryButtonText: "#FFFFFF",
        },
        dark: {
          background: "#F9FAFB",
          surface: "#FFFFFF",
          textPrimary: "#111827",
          textSecondary: "#6B7280",
          border: "#E5E7EB",
          primaryButton: "#8B5CF6",
          primaryButtonText: "#FFFFFF",
        },
        accent: {
          purple: {
            light: "#8B5CF6",
            dark: "#8B5CF6",
          },
          amber: {
            light: "#F59E0B",
            dark: "#F59E0B",
          },
        },
      },
    },
  },
  plugins: [],
};
