import { motion } from "framer-motion";

import { useLevelStore } from "~src/stores";

import classes from "./LevelFooter.module.css";

export function LevelFooter(): JSX.Element {
  const selectedValue = useLevelStore.use.selectedValue();

  return (
    <div className={classes.selectedValue}>
      <motion.span
        key={selectedValue}
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
      >
        {selectedValue}
      </motion.span>
    </div>
  );
}
