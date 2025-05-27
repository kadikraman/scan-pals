import * as Haptics from "expo-haptics";
import { PropsWithChildren } from "react";
import { GestureResponderEvent, Pressable } from "react-native";

export function TabBarButton({
  onPress,
  children,
}: PropsWithChildren<{ onPress?: (e: GestureResponderEvent) => void }>) {
  return (
    <Pressable
      className="flex-1 justify-center items-center"
      onPress={(e) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(e);
      }}
    >
      {children}
    </Pressable>
  );
}
