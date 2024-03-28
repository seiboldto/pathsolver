import { Screen } from "~src/components";
import { useLevel } from "~src/hooks";

export function LevelScreen(): JSX.Element {
  const level = useLevel();

  return <Screen>{JSON.stringify(level)}</Screen>;
}
