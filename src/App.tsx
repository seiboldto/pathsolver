import { Suspense } from "react";

import { useSettingsSideEffects } from "~src/hooks";
import { Home, Settings } from "~src/screens";
import { useRouterStore } from "~src/stores";

export function App() {
  useSettingsSideEffects();

  const route = useRouterStore.use.route();

  return (
    <Suspense>
      {route.location === "home" && <Home />}
      {route.location === "settings" && <Settings />}
    </Suspense>
  );
}
