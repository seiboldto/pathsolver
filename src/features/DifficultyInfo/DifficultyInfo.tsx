import { useMemo } from "react";

import { Difficulty, type PresetDifficulty } from "~src/levels";

import { StatsValue } from "./StatsValue";

type DifficultyInfoProps = {
  selectedDifficulty: PresetDifficulty;
};

export function DifficultyInfo({
  selectedDifficulty,
}: DifficultyInfoProps): JSX.Element {
  const { boardSize, pathLength, pathCount } = useMemo(() => {
    const { boardSize, maxPathCount, maxPathLength } =
      Difficulty.presets[selectedDifficulty];

    const minPathCount = Math.ceil((boardSize * boardSize) / maxPathLength);

    return {
      boardSize: { boardSize },
      pathLength: { min: 2, max: maxPathLength },
      pathCount: {
        min: minPathCount,
        max: maxPathCount,
      },
    };
  }, [selectedDifficulty]);

  return (
    <>
      <StatsValue i18nKey="difficulty.boardSize" values={boardSize} />
      <StatsValue i18nKey="difficulty.pathLength" values={pathLength} />
      <StatsValue
        i18nKey="difficulty.pathCount"
        values={pathCount}
        context={pathCount.min === pathCount.max ? "same" : undefined}
      />
      TODO: Display bar with distribution
    </>
  );
}
