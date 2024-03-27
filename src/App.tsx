import { IconPlayerPlay } from "@tabler/icons-react";

import { Button } from "./components";
import { useSettingsSideEffects } from "./hooks/use-settings-side-effects";
import { useRouterStore } from "./stores/router-store";

export function App() {
  useSettingsSideEffects();

  const route = useRouterStore.use.route();
  const { navigate } = useRouterStore.use.actions();

  return (
    <>
      <Button
        onClick={() => navigate({ location: "settings" })}
        icon={IconPlayerPlay}
        fullWidth
      >
        Play
      </Button>
      <p>{route.location}</p>
    </>
  );
}
