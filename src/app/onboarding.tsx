import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/src/store/userStore";
import { useTheme } from "@/src/utils/useTheme";
import { Text } from "@/src/components/Text";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Redirect, router } from "expo-router";
import { CompleteProfileDom } from "../components/CompleteProfileDom";
import { CompleteProfile } from "../components/CompleteProfile";
import { SymbolView } from "expo-symbols";
import { MaterialIcons } from "@expo/vector-icons";

const useDomComponent = true;

export default function OnboardingScreen() {
  const { accentColor } = useTheme();
  const { myProfile, setMyProfile, toggleHasOnboarded } = useUserStore();

  const handleToggleHasOnboarded = () => {
    toggleHasOnboarded();
    router.replace("/profile");
  };

  if (Platform.OS === "web") {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAwareScrollView
        contentContainerClassName="flex-1 justify-center px-4 py-8"
        keyboardShouldPersistTaps="always"
      >
        <View className="items-center justify-center mb-8">
          <SymbolView
            name="person.crop.rectangle.stack"
            type="hierarchical"
            tintColor={accentColor}
            animationSpec={{
              effect: {
                type: "bounce",
              },
            }}
            style={{ width: 100, height: 100 }}
            fallback={
              <MaterialIcons name="person" color={accentColor} size={100} />
            }
          />
          <Text bold large2x>
            Complete your profile
          </Text>
        </View>
        {useDomComponent ? (
          <CompleteProfileDom
            myProfile={myProfile}
            setMyProfile={setMyProfile}
            toggleHasOnboarded={handleToggleHasOnboarded}
          />
        ) : (
          <CompleteProfile
            myProfile={myProfile}
            setMyProfile={setMyProfile}
            toggleHasOnboarded={handleToggleHasOnboarded}
          />
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
