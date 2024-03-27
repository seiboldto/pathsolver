import { useRouterStore } from "./stores/router-store";

export function App() {
  const route = useRouterStore.use.route();
  const { navigate } = useRouterStore.use.actions();

  return (
    <>
      <button onClick={() => navigate({ location: "settings" })}>
        Settings
      </button>
      <p>{route.location}</p>
    </>
  );
}
