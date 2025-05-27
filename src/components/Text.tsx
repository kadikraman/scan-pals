import { Text as RNText, TextProps } from "react-native";
import { cn } from "../utils/cn";

type Props = TextProps & {
  // color
  secondary?: boolean;
  accent1?: boolean;
  accent2?: boolean;

  // size
  small?: boolean;
  large?: boolean;
  large2x?: boolean;

  // weight
  bold?: boolean;

  // behaviour
  ellipsis?: boolean;
};

export function Text({
  children,
  bold,
  small,
  large,
  large2x,
  ellipsis,
  secondary,
  accent1,
  accent2,
  ...props
}: Props) {
  return (
    <RNText
      {...props}
      className={cn(
        "text-light-textPrimary dark:text-dark-textPrimary",
        {
          "font-bold": bold,
          "text-sm": small,
          "text-lg": large,
          "text-2xl": large2x,
          "text-ellipsis": ellipsis,
          "text-light-textSecondary dark:text-dark-textSecondary": secondary,
          "text-accent-purple-light dark:text-accent-purple-dark": accent1,
          "text-accent-amber-light dark:text-accent-amber-dark": accent2,
        },
        props.className,
      )}
    >
      {children}
    </RNText>
  );
}
