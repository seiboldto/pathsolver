import { Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "wouter";

import { DevMode } from "~src/features";
import { useNavigation, useSettingsSideEffects } from "~src/hooks";
import { About, Level, Menu, Settings, Share } from "~src/screens";

import { useStatisticsStore } from "./stores";

export function App() {
  useSettingsSideEffects();

  const { updateStreaksOnAppLoad, invalidateAllStreakTimeouts } =
    useStatisticsStore.use.actions();

  useEffect(() => {
    updateStreaksOnAppLoad();
    return () => {
      invalidateAllStreakTimeouts();
    };
  }, [updateStreaksOnAppLoad, invalidateAllStreakTimeouts]);

  const { ROUTES } = useNavigation();

  return (
    <Suspense>
      <Switch>
        <Route path={ROUTES.MENU}>
          <Menu />
        </Route>
        <Route path={ROUTES.ABOUT}>
          <About />
        </Route>
        <Route path={ROUTES.SETTINGS}>
          <Settings />
        </Route>
        <Route path={ROUTES.LEVEL}>
          <Level />
        </Route>
        <Route path={ROUTES.SHARE}>
          {({ encodedID }) => <Share encodedID={encodedID} />}
        </Route>
        <Route>
          <Redirect to={ROUTES.MENU} replace />
        </Route>
      </Switch>
      {import.meta.env.MODE === "development" && <DevMode />}
    </Suspense>
  );
}
