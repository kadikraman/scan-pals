// See: https://docs.expo.dev/guides/dom-components/#observing-changes-in-size
"use dom";

import { useEffect } from "react";

export type DomLayout = { width: number; height: number };
export type DomLayoutCallback = (layout: DomLayout) => any;
export type DomLayoutProps = {
  onDomLayout: DomLayoutCallback;
};

export function useDomLayout(callback: DomLayoutCallback) {
  useEffect(() => {
    // Observe window size changes
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        callback({ width, height });
      }
    });

    observer.observe(document.body);

    callback({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    });

    return () => {
      observer.disconnect();
    };
  }, [callback]);
}
