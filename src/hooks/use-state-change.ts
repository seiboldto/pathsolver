import { useState } from "react";

type Callback<T, R> = (args: { curr: T; prev: T | undefined }) => R;

type UseStateChange<T> = {
  on: T;
  when: Callback<T, boolean>;
  run: Callback<T, void>;
};

export const useStateChange = <T>({
  on,
  when,
  run,
}: UseStateChange<T>): void => {
  const [prev, setPrev] = useState<T | undefined>(undefined);

  const curr = on;
  const args = { curr, prev };
  if (when(args)) {
    run(args);
  }

  if (on !== prev) {
    setPrev(on);
  }
};
