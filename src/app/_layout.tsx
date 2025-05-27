import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useUserStore } from "../store/userStore";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "../../global.css";
import { useTheme } from "../utils/useTheme";
import { useEffect } from "react";
import * as QuickActions from "expo-quick-actions";

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#111827",
    text: "#F9FAFB",
    border: "#374151",
    card: "#1F2937",
  },
};

const MyDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#F9FAFB",
  },
};

export default function RootLayout() {
  const { hasFinishedOnboarding } = useUserStore();
  const { darkMode } = useTheme();

  useEffect(() => {
    QuickActions.setItems([
      {
        title: "Add profile",
        subtitle: "Open the scanner",
        icon: Platform.OS === "ios" ? "symbol:qrcode.viewfinder" : "qrcode",
        id: "0",
        params: { href: "/scanner" },
      },
    ]);
  }, []);

  return (
    <ThemeProvider value={darkMode ? MyDarkTheme : MyDefaultTheme}>
      <GestureHandlerRootView>
        <KeyboardProvider>
          <StatusBar style="auto" />
          <Stack>
            <Stack.Protected
              guard={Boolean(!hasFinishedOnboarding && Platform.OS !== "web")}
            >
              <Stack.Screen
                name="onboarding"
                options={{ animation: "none", headerShown: false }}
              />
            </Stack.Protected>
            <Stack.Protected
              guard={Boolean(hasFinishedOnboarding || Platform.OS === "web")}
            >
              <Stack.Screen
                name="(tabs)"
                options={{
                  animation: "none",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="scanner"
                options={{
                  title: "Scan profile",
                  presentation: "modal",
                }}
              />
            </Stack.Protected>
          </Stack>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
