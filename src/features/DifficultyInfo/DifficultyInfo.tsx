import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { OperationIcon } from "~src/components";
import { Difficulty, type PresetDifficulty } from "~src/levels";
import { OPERATION_KINDS } from "~src/levels/operation";

import classes from "./DifficultyInfo.module.css";
import { StatsValue } from "./StatsValue";

type DifficultyInfoProps = {
  selectedDifficulty: PresetDifficulty;
};

export function DifficultyInfo({
  selectedDifficulty,
}: DifficultyInfoProps): JSX.Element {
  const { t } = useTranslation();

  const { boardSize, pathLength, pathCount, operations } = useMemo(() => {
    const { boardSize, maxPathCount, maxPathLength, operationDistribution } =
      Difficulty.presets[selectedDifficulty];

    const minPathCount = Math.ceil((boardSize * boardSize) / maxPathLength);
    const operations = OPERATION_KINDS.map(
      (k) => [k, operationDistribution[k]] as const
    )
      .filter((o) => o[1] !== 0)
      .sort((a, b) => b[1] - a[1]);

    return {
      boardSize: { boardSize },
      pathLength: { min: 2, max: maxPathLength },
      pathCount: {
        min: minPathCount,
        max: maxPathCount,
      },
      operations,
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
      <span>{t("difficulty.operations")}</span>
      <div className={classes.distribution}>
        {operations.map(([op, value]) => (
          <div
            key={op}
            className={classes.progress}
            style={{ "--progress-width": `${value}%` }}
            role="progressbar"
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={value}
            aria-valuetext={`${value}%`}
            aria-label={t(`operations.${op}`)}
          >
            <OperationIcon kind={op} />
          </div>
        ))}
      </div>
    </>
  );
}
