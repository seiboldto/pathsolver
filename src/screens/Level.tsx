import { Redirect } from "wouter";

import { Screen } from "~src/components";
import {
  GameBoard,
  GameButtons,
  Objectives,
  SelectedInfo,
  WinOverlay,
} from "~src/features";
import { useLevel } from "~src/hooks";
import { useLevelStore } from "~src/stores";

export function LevelScreen(): JSX.Element {
  const activeLevelState = useLevelStore.use.activeLevelState();
  const { playPersistedLevel } = useLevel();

  if (activeLevelState === null) {
    playPersistedLevel();

    return <Redirect to="/" replace />;
  }

  return (
    <Screen gap="md" key={activeLevelState.seed}>
      <GameButtons />
      <Objectives />
      <GameBoard />
      <SelectedInfo />
      <WinOverlay />
    </Screen>
  );
}
