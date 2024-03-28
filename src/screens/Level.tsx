import { IconHome } from "@tabler/icons-react";
import { useEffect } from "react";

import { Button, Group, Screen } from "~src/components";
import { useGeneratedLevel } from "~src/hooks";
import { useRouterStore } from "~src/stores";
import { useLevelStore } from "~src/stores/level-store";

export function LevelScreen(): JSX.Element {
  const level = useGeneratedLevel();

  const { navigate } = useRouterStore.use.actions();
  const navigateToHome = () => navigate({ location: "home" });

  const { setInitialNodes } = useLevelStore.use.actions();

  useEffect(() => {
    setInitialNodes(level.board);
  }, [level, setInitialNodes]);

  return (
    <Screen>
      <Group>
        <Button square onClick={navigateToHome}>
          <IconHome />
        </Button>
      </Group>
    </Screen>
  );
}
