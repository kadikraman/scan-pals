import { Dimensions, Pressable } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { PropsWithChildren } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { SymbolView } from "expo-symbols";

const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const SCREEN_WIDTH = Dimensions.get("window").width;

export function Swipeable({
  children,
  onDelete,
}: PropsWithChildren<{
  onDelete: () => void;
}>) {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue<number | undefined>(undefined);
  const opacity = useSharedValue(1);

  const handleDelete = () => {
    translateX.value = withTiming(-SCREEN_WIDTH);

    itemHeight.value = withDelay(100, withTiming(0));
    opacity.value = withTiming(0);

    onDelete();
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    height: itemHeight.value,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <ReanimatedSwipeable
      overshootRight
      rightThreshold={10}
      containerStyle={{ backgroundColor: "tomato" }}
      friction={2}
      renderRightActions={() => (
        <AnimatedPressable
          className="justify-center items-center mx-8"
          onPress={handleDelete}
        >
          <SymbolView
            name="trash.fill"
            type="hierarchical"
            tintColor="#FFF"
            style={{ width: 40, height: 40 }}
            fallback={<MaterialIcons name="delete" color="#FFF" size={40} />}
          />
        </AnimatedPressable>
      )}
    >
      <Reanimated.View
        style={animatedContainerStyle}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          if (itemHeight.value === undefined) {
            itemHeight.value = height - 1;
          }
        }}
      >
        {children}
      </Reanimated.View>
    </ReanimatedSwipeable>
  );
}
