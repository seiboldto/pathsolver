import {
  IconCalendarEvent,
  IconPlayerPlay,
  IconSettings,
} from "@tabler/icons-react";

import { Button, Screen } from "~src/components";

export function Home() {
  return (
    <Screen>
      <h1>pathfinder</h1>
      <Button icon={IconPlayerPlay}>Play</Button>
      <Button icon={IconCalendarEvent}>Daily</Button>
      <Button icon={IconSettings}>Settings</Button>
    </Screen>
  );
}
