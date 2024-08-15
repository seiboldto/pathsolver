import { useState } from "react";

type StateChangeArgs<T> = { curr: T; prev: T | undefined };

export const useStateChange = <T>(
  state: T,
  compareFn: (args: StateChangeArgs<T>) => boolean,
  callback: (args: StateChangeArgs<T>) => void
): void => {
  const [prev, setPrev] = useState<T | undefined>(undefined);

  const curr = state;
  const args = { curr, prev };
  if (compareFn(args)) {
    callback(args);
  }

  if (state !== prev) {
    setPrev(state);
  }
};
