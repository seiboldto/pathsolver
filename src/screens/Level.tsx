import { Redirect } from "wouter";

import { Screen } from "~src/components";
import {
  GameBoard,
  GameButtons,
  Objectives,
  SelectedInfo,
  WinOverlay,
} from "~src/features";
import { useLevelStore } from "~src/stores";

export function LevelScreen(): JSX.Element {
  const activeLevelState = useLevelStore.use.activeLevelState();
  if (activeLevelState === null) {
    return <Redirect to="/" replace />;
  }

  return (
    <Screen gap="md" key={activeLevelState.level.seed}>
      <GameButtons />
      <Objectives />
      <GameBoard />
      <SelectedInfo />
      <WinOverlay />
    </Screen>
  );
}
