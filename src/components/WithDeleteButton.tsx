import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

export function WithDeleteButton({
  children,
  onDelete,
}: {
  children: React.ReactNode;
  onDelete: () => void;
}) {
  return (
    <View className="flex-row items-center mb-4">
      {children}
      <View className="absolute right-2 top-2">
        <Pressable
          onPress={onDelete}
          className="ml-2 hover:opacity-50 transition-opacity rounded-md p-1"
        >
          <MaterialIcons
            name="close"
            size={18}
            className="color-slate-700 dark:color-slate-400"
          />
        </Pressable>
      </View>
    </View>
  );
}
