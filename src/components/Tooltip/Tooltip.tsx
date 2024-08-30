import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  offset,
  shift,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { cloneElement, useRef, useState } from "react";
import { createPortal } from "react-dom";

import classes from "./Tooltip.module.css";

const tooltipRoot = document.querySelector("#tooltip-root")!;

type TooltipProps = {
  label: string;
  children: React.ReactElement;
};

export function Tooltip({ label, children }: TooltipProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
    placement: "top",
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const role = useRole(context, { role: "label" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    role,
  ]);

  return (
    <>
      {cloneElement(children, {
        ...getReferenceProps(),
        "aria-label": label,
        ref: refs.setReference,
      })}
      {isOpen &&
        createPortal(
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={classes.tooltip}
          >
            {label}
            <FloatingArrow
              context={context}
              ref={arrowRef}
              className={classes.arrow}
            />
          </div>,
          tooltipRoot
        )}
    </>
  );
}
