import { useState } from "react";

type BooleanState = [
  boolean,
  { show: () => void; hide: () => void; toggle: () => void }
];

export const useBooleanState = (initialState: boolean): BooleanState => {
  const [state, setState] = useState(initialState);

  const show = () => setState(true);
  const hide = () => setState(false);
  const toggle = () => setState((prev) => !prev);

  return [state, { show, hide, toggle }];
};
