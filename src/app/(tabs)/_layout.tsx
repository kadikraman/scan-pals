import { Tabs } from "expo-router";
import { useTheme } from "@/src/utils/useTheme";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function TabsLayout() {
  const { accentColor } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: accentColor,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Connections",
          tabBarIcon: ({ color, size }) => (
            <EvilIcons name="archive" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "My Profile",
          tabBarIcon: ({ color, size }) => (
            <EvilIcons name="gear" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
