import { Tabs } from "expo-router";
import { useTheme } from "@/src/utils/useTheme";
import { MaterialIcons } from "@expo/vector-icons";
import { SymbolView } from "expo-symbols";
import { TabBarButton } from "@/src/components/TabBarButton";
import { MenuButton } from "@/src/components/MenuButton";
import { BlurBackground } from "@/src/components/BlurBackground";
import { Platform } from "react-native";
import { ComponentProps } from "react";
import { useQuickActionRouting } from "expo-quick-actions/router";

const blurViewProps: ComponentProps<typeof Tabs.Screen>["options"] = {
  headerTransparent: Platform.select({
    ios: true,
    default: false,
  }),
  tabBarStyle: Platform.select({
    ios: {
      position: "absolute",
    },
    default: {},
  }),
  headerBackground: BlurBackground,
  tabBarBackground: BlurBackground,
};

export default function TabsLayout() {
  const { accentColor } = useTheme();

  useQuickActionRouting();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: accentColor,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          ...blurViewProps,
          title: "Connections",
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name="person.crop.rectangle.stack"
              type="hierarchical"
              tintColor={color}
              style={{ width: size, height: size }}
              fallback={<MaterialIcons name="home" color={color} size={size} />}
            />
          ),
          tabBarButton: ({ onPress, children }) => (
            <TabBarButton onPress={onPress}>{children}</TabBarButton>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          ...blurViewProps,
          title: "My Profile",
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name="person.bust.fill"
              type="hierarchical"
              tintColor={color}
              style={{ width: size, height: size }}
              fallback={
                <MaterialIcons name="person" color={color} size={size} />
              }
            />
          ),
          tabBarButton: ({ onPress, children }) => (
            <TabBarButton onPress={onPress}>{children}</TabBarButton>
          ),
          headerRight: () => <MenuButton />,
        }}
      />
    </Tabs>
  );
}
