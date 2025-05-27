// See: https://docs.expo.dev/guides/dom-components/#observing-changes-in-size

import {
  useCallback,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { View } from "react-native";
import { DomLayout, DomLayoutProps } from "@/src/utils/useDomLayout";
import { DOMProps } from "expo/dom";

type DomContainerProps = ComponentProps<typeof View> & {
  /** If the heights should be measured from the DOM component */
  vertical?: boolean;
  /** If the widths should be measured from the DOM component */
  horizontal?: boolean;
  /** Initial width it should use */
  defaultWidth?: number;
  /** Initial Height it should use */
  defaultHeight?: number;
  /** Render prop with the dom layout callback and container styles */
  render: (
    props: DomLayoutProps & {
      dom: DOMProps;
      containerStyle: Partial<DomLayout>;
    },
  ) => ReactNode;
};

const defaultDomProps: DOMProps = {
  scrollEnabled: false, // Avoid letting the webview scroll
  automaticallyAdjustContentInsets: false, // Avoid adding unexpected content insets, this is done outside the DOM component
  matchContents: true, // Always attempt to match the webview content sizes
};

export function DomContainer({
  vertical = false,
  horizontal = false,
  defaultWidth = 0,
  defaultHeight = 0,
  render,
}: DomContainerProps) {
  const [height, setHeight] = useState(defaultHeight);
  const [width, setWidth] = useState(defaultWidth);

  const onDomLayout = useCallback(
    (layout: DomLayout) => {
      setHeight(layout.height);
      setWidth(layout.width);
    },
    [setHeight, setWidth],
  );

  const containerStyle = useMemo(
    () => ({
      width: horizontal ? width : undefined,
      height: vertical ? height : undefined,
    }),
    [width, horizontal, height, vertical],
  );

  return render({ onDomLayout, containerStyle, dom: defaultDomProps });
}
