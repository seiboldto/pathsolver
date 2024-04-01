import { IconChevronRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Fragment } from "react";

import { useLevelStore } from "~src/stores";

import classes from "./LevelFooter.module.css";

export function LevelFooter(): JSX.Element {
  const selectedValue = useLevelStore.use.selectedValue();
  const selectedNodes = useLevelStore.use.selectedNodes();
  const paths = useLevelStore.use.paths();

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
          {selectedNodes.map((_, i) => (
            <div key={i} className={classes.dot} />
          ))}
        </div>
      </div>
      <div className={classes.paths}>
        {paths.map((p, i) => (
          <Fragment key={p.id}>
            <div className={classes.path}>{p.result}</div>
            {i < paths.length - 1 && <IconChevronRight />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
