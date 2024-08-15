import { Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "wouter";

import { DevMode } from "~src/features";
import { useSettingsSideEffects } from "~src/hooks";
import { Home, Level, Settings } from "~src/screens";

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

  return (
    <Suspense>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/level">
          <Level />
        </Route>
        <Route>
          <Redirect to="/" replace />
        </Route>
      </Switch>
      {import.meta.env.MODE === "development" && <DevMode />}
    </Suspense>
  );
}
