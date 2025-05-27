import { Tabs } from "expo-router";
import { useTheme } from "@/src/utils/useTheme";
import { MaterialIcons } from "@expo/vector-icons";
import { SymbolView } from "expo-symbols";

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
            <SymbolView
              name="person.crop.rectangle.stack"
              type="hierarchical"
              tintColor={color}
              style={{ width: size, height: size }}
              fallback={<MaterialIcons name="home" color={color} size={size} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
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
        }}
      />
    </Tabs>
  );
}
