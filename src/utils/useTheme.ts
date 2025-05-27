// eslint-disable-next-line @typescript-eslint/no-require-imports
const tailwindConfig = require("../../tailwind.config");

export const useTheme = () => {
  const darkMode = false;

  const accentColor = darkMode
    ? tailwindConfig.theme.extend.colors.accent.purple.dark
    : tailwindConfig.theme.extend.colors.accent.purple.light;

  const borderColor = darkMode
    ? tailwindConfig.theme.extend.colors.dark.border
    : tailwindConfig.theme.extend.colors.light.border;

  return { darkMode, accentColor, borderColor };
};
