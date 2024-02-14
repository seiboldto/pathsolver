import "./styles/styles.scss";
import App from "./App.svelte";
import "~lib/i18n";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const target = document.querySelector("#app")!;

const app = new App({
  target,
});

export default app;
