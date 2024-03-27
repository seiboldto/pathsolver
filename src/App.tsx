import { IconPlayerPlay } from "@tabler/icons-react";

import { Button } from "./components";
import { useRouterStore } from "./stores/router-store";

export function App() {
  const route = useRouterStore.use.route();
  const { navigate } = useRouterStore.use.actions();

  return (
    <>
      <Button
        onClick={() => navigate({ location: "settings" })}
        icon={IconPlayerPlay}
      >
        Play
      </Button>
      <p>{route.location}</p>
    </>
  );
}
