import { IconBulb, IconFocus2 } from "@tabler/icons-react";
import { t } from "i18next";

import { Button, Tooltip } from "~src/components";
import { useActiveLevel } from "~src/hooks";
import { useLevelStore } from "~src/stores";

const print = (...message: unknown[]) => {
  console.log(message.join("\n"));
};

export function LevelCheats() {
  const activeLevelState = useLevelStore.use.activeLevelState();
  const { handleGameStep } = useActiveLevel();

  const handlePrintObjectives = () => {
    if (!activeLevelState) return;

    const { objectives } = activeLevelState;

    print(
      ...objectives.flatMap((o) => [
        "Objective " + o.index,
        o.path.map((i) => i.row + ", " + i.column).join(" -> "),
      ])
    );
  };

  const handleAdvanceObjectives = () => {
    if (!activeLevelState) return;

    const { nodes, edges } = activeLevelState;
    handleGameStep({ nodes, edges });
  };

  return (
    <>
      <Tooltip label={t("dev-mode.print-objectives")}>
        <Button square onClick={handlePrintObjectives}>
          <IconBulb />
        </Button>
      </Tooltip>

      <Tooltip label={t("dev-mode.advance-objectives")}>
        <Button square onClick={handleAdvanceObjectives}>
          <IconFocus2 />
        </Button>
      </Tooltip>
    </>
  );
}
