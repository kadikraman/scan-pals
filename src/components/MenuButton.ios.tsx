import { SymbolView } from "expo-symbols";
import { View } from "react-native";
import { useTheme } from "@/src/utils/useTheme";
import { ContextMenu, Button } from "@expo/ui/swift-ui";
import { useUserStore } from "@/src/store/userStore";
import * as Haptics from "expo-haptics";

export function MenuButton() {
  const { accentColor } = useTheme();
  const { resetProfile, toggleHasOnboarded } = useUserStore();

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
        <Button systemImage="arrow.clockwise" onPress={handleRestartOnboarding}>
          Restart Onboarding
        </Button>
        <Button systemImage="pencil" onPress={handleEditProfile}>
          Edit Profile
        </Button>
      </ContextMenu.Items>
      <ContextMenu.Trigger>
        <View className="items-end flex-1 pt-1 mr-4">
          <SymbolView
            name="gearshape"
            type="hierarchical"
            tintColor={accentColor}
            style={{ width: 30, height: 30 }}
          />
        </View>
      </ContextMenu.Trigger>
    </ContextMenu>
  );
}
