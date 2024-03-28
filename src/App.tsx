import { Suspense } from "react";

import { useSettingsSideEffects } from "./hooks/use-settings-side-effects";
import { Home } from "./screens/Home";
import { Settings } from "./screens/Settings";
import { useRouterStore } from "./stores/router-store";

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
