export const isMobileDevice = (): boolean => {
  return window.innerWidth <= 768;
};

export const isTouchDevice = (): boolean => {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    ("msMaxTouchPoints" in navigator &&
      typeof navigator.msMaxTouchPoints === "number" &&
      navigator.msMaxTouchPoints > 0)
  );
};
