import { View } from "react-native";
import { Profile } from "@/src/types";
import { cn } from "@/src/utils/cn";
import { Text } from "@/src/components/Text";
import { Image } from "expo-image";
import { avatars, fallbackAvatar } from "../constants";
import { useTheme } from "../utils/useTheme";

export function ProfileCard({
  profile,
  className,
  canDelete,
  asCard,
}: {
  profile: Profile | Omit<Profile, "id">;
  className?: string;
  canDelete?: boolean;
  asCard?: boolean;
}) {
  const { accentColor } = useTheme();

  const tintColor = profile.color || accentColor;

  return (
    <View
      className={cn(
        "bg-light-surface dark:bg-dark-surface web:rounded-lg",
        "p-4 flex-row items-center gap-4",
        {
          "rounded-lg px-4 mx-4 elevation-sm shadow-sm mb-6": asCard,
        },
        className,
      )}
    >
      <Image
        source={
          avatars.find((avatar) => avatar.id === profile.avatar)?.image ||
          fallbackAvatar
        }
        style={{
          width: 50,
          height: 50,
        }}
        tintColor={tintColor}
        contentFit="contain"
      />
      <View className="flex-1 mt-3">
        <Text
          large2x
          bold
          ellipsis
          numberOfLines={1}
          style={{ color: tintColor }}
        >
          {profile?.name}
        </Text>
        <Text bold numberOfLines={1}>
          {profile?.bio}
        </Text>
        <Text secondary className="text-right" small>
          {new Date(profile.updatedAt).toLocaleString()}
        </Text>
      </View>
    </View>
  );
}
