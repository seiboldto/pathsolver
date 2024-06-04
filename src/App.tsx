import { Suspense } from "react";
import { Redirect, Route, Switch } from "wouter";

import { useSettingsSideEffects } from "~src/hooks";
import { Difficulty, Home, Level, Settings } from "~src/screens";

export function App() {
  useSettingsSideEffects();

  return (
    <Suspense>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/difficulty">
          <Difficulty />
        </Route>
        <Route path="/level">
          <Level />
        </Route>
        <Route>
          <Redirect to="/" replace />
        </Route>
      </Switch>
    </Suspense>
  );
}
