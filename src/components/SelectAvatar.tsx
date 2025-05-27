import { View, Pressable, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { cn } from "../utils/cn";
import { useTheme } from "../utils/useTheme";
import * as Haptics from "expo-haptics";
import { Fragment } from "react";
import { avatars } from "../constants";

const avatarColors = {
  teal: "#14B8A6",
  yellow: "#F59E0B",
  rose: "#F43F5E",
  sky: "#0EA5E9",
  pink: "#EC4899",
};

type Props = {
  color: string | undefined;
  setColor: (color: string) => void;
  avatar: string | undefined;
  setAvatar: (avatar: string) => void;
};

export function SelectAvatar({ color, setColor, avatar, setAvatar }: Props) {
  const { width } = useWindowDimensions();
  const { darkMode } = useTheme();

  return (
    <Fragment>
      <View className="flex-row gap-1 mb-4 justify-center">
        {Object.values(avatarColors).map((item) => (
          <Pressable
            key={item}
            className={cn("p-1 rounded-lg border-2 border-transparent", {
              "border-slate-600 dark:border-slate-300": item === color,
              "opacity-50": color && color !== item,
            })}
            onPress={() => {
              Haptics.selectionAsync();
              setColor(item);
            }}
          >
            <View
              style={{
                backgroundColor: item,
                width: width / 8,
                height: width / 8,
              }}
              className="rounded-md"
            />
          </Pressable>
        ))}
      </View>
      <View className="flex-row flex-wrap mb-4 gap-1 justify-center">
        {avatars.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => {
              Haptics.selectionAsync();
              setAvatar(item.id);
            }}
            className={cn(
              "p-3 rounded-full border-2 border-light-border dark:border-dark-border",
              {
                "border-slate-600 dark:border-slate-300": avatar === item.id,
                "opacity-50": avatar && avatar !== item.id,
              },
            )}
          >
            <Image
              source={item.image}
              style={{
                width: width / 12,
                height: width / 12,
                tintColor:
                  avatar === item.id && color
                    ? color
                    : darkMode
                      ? "white"
                      : "black",
              }}
              contentFit="contain"
            />
          </Pressable>
        ))}
      </View>
    </Fragment>
  );
}
