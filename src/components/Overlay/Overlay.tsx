import FocusTrap from "focus-trap-react";
import { createPortal } from "react-dom";

import { Title } from "~src/components";
import { useId, useStateChange } from "~src/hooks";

import classes from "./Overlay.module.css";

type OverlayProps = {
  visible: boolean;
  children: React.ReactNode;
  title: string;
};

const overlayRoot = document.querySelector("#overlay-root")!;
const root = document.querySelector("#root")!;

export function Overlay({
  visible,
  children,
  title,
}: OverlayProps): JSX.Element | null {
  const id = useId("overlay");

  useStateChange({
    on: visible,
    when: ({ prev, curr }) => prev !== curr,
    run: ({ curr }) => {
      root.ariaHidden = curr ? "true" : "false";
    },
  });

  if (!visible) return null;
  return createPortal(
    <FocusTrap>
      <div className={classes.overlay} role="dialog" aria-labelledby={id}>
        <Title id={id}>{title}</Title>
        {children}
      </div>
    </FocusTrap>,
    overlayRoot
  );
}
