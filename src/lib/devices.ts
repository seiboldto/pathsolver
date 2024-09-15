export const isTouchDevice = (): boolean => {
  return window.matchMedia("(pointer:coarse)").matches;
};

export const isDarkThemeDevice = (): boolean => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};
