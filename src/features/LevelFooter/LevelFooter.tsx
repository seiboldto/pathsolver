import { IconCheck } from "@tabler/icons-react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

import { useLevelStore } from "~src/stores";

import classes from "./LevelFooter.module.css";

export function LevelFooter(): JSX.Element {
  const selectedValue = useLevelStore.use.selectedValue();
  const selectedNodes = useLevelStore.use.selectedNodes();

  const paths = useLevelStore.use.paths();
  const currentPathIndex = useLevelStore.use.currentPathIndex();

  const invalidNodeID = useLevelStore.use.invalidNodeID();

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
        <motion.div
          className={classes.dots}
          variants={{
            shake: { x: [4, -4, 0], transition: { duration: 0.2 } },
          }}
          animate={invalidNodeID ? "shake" : "initial"}
        >
          {selectedNodes.map((_, i) => (
            <div key={i} className={classes.dot} />
          ))}
        </motion.div>
      </div>
      <div className={classes.paths}>
        {paths.map((p, i) => (
          <div
            key={p.id}
            className={clsx(
              classes.path,
              i < currentPathIndex && classes.completed,
              i === currentPathIndex && classes.active
            )}
          >
            <span className={classes.pathResult}>{p.result}</span>
            <IconCheck className={classes.pathCheck} />
          </div>
        ))}
      </div>
    </div>
  );
}
