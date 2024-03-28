import { IconHome } from "@tabler/icons-react";
import { useEffect } from "react";

import { Button, Group, Screen } from "~src/components";
import { Board } from "~src/features";
import { useGeneratedLevel } from "~src/hooks";
import { useLevelStore, useRouterStore } from "~src/stores";

export function LevelScreen(): JSX.Element {
  const generatedLevel = useGeneratedLevel();

  const { navigate } = useRouterStore.use.actions();
  const navigateToHome = () => navigate({ location: "home" });

  const { setInitialNodes } = useLevelStore.use.actions();

  useEffect(() => {
    setInitialNodes(generatedLevel.board);
  }, [generatedLevel, setInitialNodes]);

  return (
    <Screen>
      <Group>
        <Button square onClick={navigateToHome}>
          <IconHome />
        </Button>
      </Group>
      <Board />
    </Screen>
  );
}
