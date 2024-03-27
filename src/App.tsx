import { useSettingsSideEffects } from "./hooks/use-settings-side-effects";
import { Home } from "./screens/Home";
import { useRouterStore } from "./stores/router-store";

export function App() {
  useSettingsSideEffects();

  const route = useRouterStore.use.route();

  if (route.location === "home") return <Home />;
  return null;
}
