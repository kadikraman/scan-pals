import { Stack } from "expo-router";

export default function WebLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Protected guard={true}>
        <Stack.Screen name="profile" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
