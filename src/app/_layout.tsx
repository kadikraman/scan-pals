import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useUserStore } from "../store/userStore";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css";

export default function RootLayout() {
  const { hasFinishedOnboarding } = useUserStore();

  return (
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
  );
}
