import { useId as _useId, useMemo } from "react";

export const useId = (prefix: string) => {
  const id = _useId();
  const memoized = useMemo(
    () => `${prefix}-${id.replace(/:/g, "")}`,
    [id, prefix]
  );
  return memoized;
};
