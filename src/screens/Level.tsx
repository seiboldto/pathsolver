import { IconHome, IconRefresh } from "@tabler/icons-react";

import { Button, Group, Screen } from "~src/components";
import { useRouterStore } from "~src/stores";

export function LevelScreen(): JSX.Element {
  const { navigate } = useRouterStore.use.actions();
  const navigateToHome = () => navigate({ location: "home" });

  return (
    <Screen gap="xl">
      <Group>
        <Button square onClick={navigateToHome}>
          <IconHome />
        </Button>
        <Button square>
          <IconRefresh />
        </Button>
      </Group>
    </Screen>
  );
}
