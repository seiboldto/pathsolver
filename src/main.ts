import "./styles/styles.scss";
import "~lib/i18n";

import App from "./App.svelte";

const app = new App({
  target: document.querySelector("#app"),
});

// eslint-disable-next-line import/no-default-export
export default app;
