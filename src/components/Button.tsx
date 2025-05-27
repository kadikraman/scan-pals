import {
  Pressable,
  PressableProps,
  Text,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { cn } from "../utils/cn";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  theme?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  isLoading?: boolean;
} & PressableProps;

export function Button({
  title,
  onPress,
  theme = "primary",
  disabled,
  isLoading,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-row items-center justify-center rounded-md px-5 py-3 mb-4 border",
        theme === "primary" &&
          "bg-light-primaryButton border-light-primaryButton dark:bg-dark-primaryButton dark:border-dark-primaryButton",
        theme === "secondary" &&
          "bg-white border-gray-300 dark:bg-slate-600 dark:border-slate-500",
        theme === "tertiary" && "bg-transparent border-transparent",
        disabled && "opacity-50",
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      <Text
        className={cn(
          "font-semibold text-lg tracking-wider",
          theme === "secondary" && "text-black dark:text-white",
          theme === "primary" &&
            "text-light-primaryButtonText dark:text-dark-primaryButtonText",
          theme === "tertiary" &&
            "text-light-textSecondary dark:text-dark-textSecondary",
        )}
      >
        {isLoading ? (
          <ActivityIndicator size="small" className="mr-2" />
        ) : (
          title
        )}
      </Text>
    </Pressable>
  );
}
