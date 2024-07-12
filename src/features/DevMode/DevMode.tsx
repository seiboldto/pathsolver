import { IconCode } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { Button, Tooltip } from "~src/components";
import { useUiStore } from "~src/stores";

import classes from "./DevMode.module.css";

export function DevMode() {
  const { t } = useTranslation();

  const isDeveloperMode = useUiStore.use.isDeveloperMode();
  const { toggleDeveloperMode } = useUiStore.use.actions();

  return (
    <div className={classes.devMode}>
      <Tooltip label={t("developer-mode.title")}>
        <Button square onClick={toggleDeveloperMode}>
          <IconCode />
        </Button>
      </Tooltip>
      {isDeveloperMode && <>buttons</>}
    </div>
  );
}
