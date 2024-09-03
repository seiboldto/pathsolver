import { Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "wouter";

import { DevMode } from "~src/features";
import { useSettingsSideEffects } from "~src/hooks";
import { Level, Menu, Settings, Share } from "~src/screens";

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
          <Menu />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/level">
          <Level />
        </Route>
        <Route path="/share/:encodedID">
          {({ encodedID }) => <Share encodedID={encodedID} />}
        </Route>
        <Route>
          <Redirect to="/" replace />
        </Route>
      </Switch>
      {import.meta.env.MODE === "development" && <DevMode />}
    </Suspense>
  );
}
