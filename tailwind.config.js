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
          background: "#111827",
          surface: "#1F2937",
          textPrimary: "#F9FAFB",
          textSecondary: "#9CA3AF",
          border: "#374151",
          primaryButton: "#C4B5FD",
          primaryButtonText: "#111827",
        },
        accent: {
          purple: {
            light: "#8B5CF6",
            dark: "#C4B5FD",
          },
          amber: {
            light: "#F59E0B",
            dark: "#FBBF24",
          },
        },
      },
    },
  },
  plugins: [],
};
