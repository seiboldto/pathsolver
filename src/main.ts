import "./styles/styles.scss";
import App from "./App.svelte";
import "~lib/i18n";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
