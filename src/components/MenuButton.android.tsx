import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { useTheme } from "@/src/utils/useTheme";
import { useUserStore } from "@/src/store/userStore";
import { ContextMenu, Button } from "@expo/ui/jetpack-compose";
import * as Haptics from "expo-haptics";

export function MenuButton() {
  const { accentColor } = useTheme();
  const { resetProfile, toggleHasOnboarded } = useUserStore();
  const { darkMode } = useTheme();

  const handleEditProfile = () => {
    Haptics.selectionAsync();
    toggleHasOnboarded();
  };

  const handleRestartOnboarding = () => {
    Haptics.selectionAsync();
    resetProfile();
    toggleHasOnboarded();
  };

  return (
    <ContextMenu style={{ width: 150, height: 50 }}>
      <ContextMenu.Items>
        <Button
          onPress={handleRestartOnboarding}
          elementColors={{ contentColor: darkMode ? "white" : "black" }}
        >
          Restart Onboarding
        </Button>
        <Button
          onPress={handleEditProfile}
          elementColors={{ contentColor: darkMode ? "white" : "black" }}
        >
          Edit Profile
        </Button>
      </ContextMenu.Items>
      <ContextMenu.Trigger>
        <View className="items-end flex-1 pt-3 mr-4 ">
          <MaterialIcons name="settings" color={accentColor} size={28} />
        </View>
      </ContextMenu.Trigger>
    </ContextMenu>
  );
}
