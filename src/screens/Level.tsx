import { Redirect } from "wouter";

import { Screen } from "~src/components";
import {
  Alert,
  GameBoard,
  GameButtons,
  Objectives,
  SelectedInfo,
} from "~src/features";
import { useLevelStore } from "~src/stores";

export function LevelScreen(): JSX.Element {
  const activeLevelState = useLevelStore.use.activeLevelState();
  if (activeLevelState === null) {
    return <Redirect to="/" replace />;
  }

  return (
    <Screen gap="md">
      <GameButtons />
      <Objectives />
      <GameBoard />
      <SelectedInfo />
      <Alert />
    </Screen>
  );
}
