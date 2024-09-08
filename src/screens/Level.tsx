import { Redirect } from "wouter";

import { Screen } from "~src/components";
import {
  GameBoard,
  GameButtons,
  Objectives,
  SelectedInfo,
  Tutorial,
  WinOverlay,
} from "~src/features";
import { useLevel, useNavigation } from "~src/hooks";
import { useLevelStore } from "~src/stores";

export function LevelScreen(): JSX.Element {
  const activeLevelState = useLevelStore.use.activeLevelState();
  const { playPersistedLevel } = useLevel();

  const { ROUTES } = useNavigation();

  if (activeLevelState === null) {
    playPersistedLevel();

    return <Redirect to={ROUTES.MENU} replace />;
  }

  return (
    <Screen gap="md" key={activeLevelState.seed}>
      <GameButtons />
      <Objectives />
      <GameBoard />
      <SelectedInfo />
      <Tutorial />
      <WinOverlay />
    </Screen>
  );
}
