import { Redirect } from "wouter";

import { Screen } from "~src/components";
import { useLevel, useNavigation } from "~src/hooks";
import {
  Alerts,
  GameBoard,
  GameButtons,
  Objectives,
  SelectedInfo,
  WinOverlay,
} from "~src/level-features";
import { useLevelStore } from "~src/stores";

export function LevelScreen(): JSX.Element | null {
  const activeLevelState = useLevelStore.use.activeLevelState();
  const { persistedLevelSeed, playPersistedLevel } = useLevel();

  const { ROUTES } = useNavigation();

  if (activeLevelState === null) {
    if (persistedLevelSeed) {
      playPersistedLevel();
      return null;
    } else {
      return <Redirect to={ROUTES.MENU} replace />;
    }
  }

  return (
    <Screen gap="md" key={activeLevelState.seed}>
      <GameButtons />
      <Objectives />
      <GameBoard />
      <SelectedInfo />
      <Alerts />
      <WinOverlay />
    </Screen>
  );
}
