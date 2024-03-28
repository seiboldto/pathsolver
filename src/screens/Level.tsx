import { IconHome } from "@tabler/icons-react";

import { Button, Group, Screen } from "~src/components";
import { useLevel } from "~src/hooks";
import { useRouterStore } from "~src/stores";

export function LevelScreen(): JSX.Element {
  const level = useLevel();

  const { navigate } = useRouterStore.use.actions();
  const navigateToHome = () => navigate({ location: "home" });

  return (
    <Screen>
      <Group>
        <Button square onClick={navigateToHome}>
          <IconHome />
        </Button>
      </Group>
      {level.paths[0].result}
    </Screen>
  );
}
