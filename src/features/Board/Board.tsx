import { IconDivide, IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import { useGeneratedLevel } from "~src/hooks";
import { type OperationKind } from "~src/levels";
import { useLevelStore } from "~src/stores";

import classes from "./Board.module.css";
import { Node } from "./Node";

const operationIcons: Record<OperationKind, JSX.Element> = {
  addition: <IconPlus size={16} />,
  subtraction: <IconMinus size={16} />,
  multiplication: <IconX size={16} />,
  division: <IconDivide size={16} />,
};

export function Board(): JSX.Element {
  const generatedLevel = useGeneratedLevel();
  const nodes = useLevelStore.use.nodes();
  const edges = useLevelStore.use.edges();
  const { removeSelectedNodes, resetSelected, removeUnconnectedEdges } =
    useLevelStore.use.actions();

  const { boardSize } = generatedLevel.board.difficulty;

  useEffect(() => {
    const handleMouseUp = () => {
      const { selectedNodes, selectedValue, paths, currentPathIndex } =
        useLevelStore.getState();
      const currentPath = paths[currentPathIndex];

      if (selectedNodes.length <= 1 || selectedValue !== currentPath.result) {
        resetSelected();
        return;
      }

      removeSelectedNodes();
      removeUnconnectedEdges();
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [removeSelectedNodes, resetSelected, removeUnconnectedEdges]);

  return (
    <div
      className={classes.board}
      style={
        {
          "--board-size": boardSize,
        } as React.CSSProperties
      }
    >
      {nodes.map((n) => n && <Node node={n} key={n.id} />)}
      <AnimatePresence>
        {edges.map((edge, i) => {
          if (!edge) return null;

          const isHorizontal = i < edges.length / 2;
          const boardSizeOffset = isHorizontal ? 1 : 0;
          const index = isHorizontal ? i : i - edges.length / 2;

          return (
            <motion.div
              transition={{ delay: i * 0.03 }}
              exit={{
                opacity: 0,
                transform: "translate(-50%,-50%) scale(0.1)",
              }}
              key={edge.id}
              className={clsx(
                classes.edge,
                isHorizontal ? classes.horizontal : classes.vertical
              )}
              style={
                {
                  "--row": Math.floor(index / (boardSize - boardSizeOffset)),
                  "--column": index % (boardSize - boardSizeOffset),
                } as React.CSSProperties
              }
            >
              {operationIcons[edge.operation.kind]}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
