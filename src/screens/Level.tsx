import { IconHome, IconRefresh } from "@tabler/icons-react";
import { useLocation } from "wouter";

import { Button, Group, Screen } from "~src/components";

export function LevelScreen(): JSX.Element {
  const [, setLocation] = useLocation();
  const navigateToHome = () => setLocation("/");

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
