import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";

import { useSettingsSideEffects } from "~src/hooks";
import { Difficulty, Home, Settings } from "~src/screens";
import { useRouterStore } from "~src/stores";

export function App() {
  useSettingsSideEffects();

  const route = useRouterStore.use.route();

  return (
    <Suspense>
      <AnimatePresence initial={false}>
        <motion.div
          key={route.location}
          transition={{
            duration: 0.3,
            ease: (t) => (t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t)),
          }}
          exit={{ opacity: 0 }}
        >
          {route.location === "home" && <Home />}
          {route.location === "settings" && <Settings />}
          {route.location === "difficulty" && <Difficulty />}
        </motion.div>
      </AnimatePresence>
    </Suspense>
  );
}
