import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { useTheme } from "../utils/useTheme";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export function BlurBackground() {
  const { darkMode } = useTheme();

  return (
    <BlurView
      tint="regular"
      intensity={60}
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: darkMode
            ? "rgba(28, 39, 64, 0.4)"
            : "rgba(255, 255, 255, 0.4)",
        },
      ]}
    />
  );
}

export function useOverflow() {
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  if (process.env.EXPO_OS === "ios") {
    return {
      paddingTop: headerHeight,
      paddingBottom: tabBarHeight,
    };
  }

  return {
    paddingTop: 0,
    paddingBottom: 0,
  };
}
