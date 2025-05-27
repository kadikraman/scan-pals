import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export function BlurBackground() {
  return (
    <BlurView
      tint="systemChromeMaterial"
      intensity={60}
      style={StyleSheet.absoluteFill}
    />
  );
}

export function useOverflow() {
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  return {
    paddingTop: headerHeight,
    paddingBottom: tabBarHeight,
  };
}
