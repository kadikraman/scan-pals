import { View, useWindowDimensions, ScrollView, Pressable } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useUserStore } from "@/src/store/userStore";
import { ProfileCard } from "@/src/components/ProfileCard";
import { Button } from "@/src/components/Button";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const { myProfile } = useUserStore();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const { toggleHasOnboarded } = useUserStore();

  return (
    <ScrollView className="flex-1">
      <View className="items-center mb-6 pt-6">
        <View className="border-4 border-white">
          <QRCode
            size={Math.floor(width * 0.8)}
            value={JSON.stringify(myProfile)}
          />
        </View>
      </View>
      <Pressable onPress={() => toggleHasOnboarded()}>
        {myProfile && <ProfileCard profile={myProfile} asCard />}
      </Pressable>
      <Button
        title="Scan profile"
        theme="tertiary"
        onPress={() => router.push("/scanner")}
      />
    </ScrollView>
  );
}
