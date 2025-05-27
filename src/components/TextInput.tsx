import { TextInput as RNTextInput, TextInputProps } from "react-native";
import { cn } from "@/src/utils/cn";
import { useTheme } from "@/src/utils/useTheme";

export function TextInput(
  props: TextInputProps & { label: string; className?: string },
) {
  const { darkMode } = useTheme();

  return (
    <RNTextInput
      {...props}
      className={cn("border rounded-md p-4 mb-6 placeholder:text-slate-400", {
        "border-dark-border bg-black text-dark-textPrimary": darkMode,
        "border-light-border bg-white text-light-textPrimary": !darkMode,
      })}
    />
  );
}
