import { clsx } from "clsx";
import { motion } from "framer-motion";

import { useGeneratedLevel } from "~src/hooks";
import { useLevelStore } from "~src/stores";

import classes from "./LevelFooter.module.css";

export function LevelFooter(): JSX.Element {
  const level = useGeneratedLevel();
  const { maxPathLength } = level.board.difficulty;

  const selectedValue = useLevelStore.use.selectedValue();
  const selectedNodes = useLevelStore.use.selectedNodes();

  return (
    <div className={classes.levelFooter}>
      <div className={classes.selectedInfo}>
        <div className={classes.selectedValue}>
          <motion.span
            key={selectedNodes.length}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
          >
            {selectedValue}
          </motion.span>
        </div>
        <div className={classes.dots}>
          {Array.from({ length: maxPathLength }, (_, i) => (
            <div
              key={i}
              className={clsx(
                classes.dot,
                i < selectedNodes.length && classes.selected
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
