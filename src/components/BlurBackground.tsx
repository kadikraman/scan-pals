// This is a shim for web and Android where the tab bar is generally opaque.
export const BlurBackground = undefined;

export function useOverflow() {
  return {
    paddingTop: 0,
    paddingBottom: 0,
  };
}
