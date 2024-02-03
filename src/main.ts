import "./styles/styles.scss";
import "~lib/i18n";

import App from "./App.svelte";

const app = new App({
  target: document.querySelector("#app"),
});

// eslint-disable-next-line import/no-default-export
export default app;

/*
import init, { greet } from "pathfinder-levels";
// Don't worry if vscode told you can't find my-crate
// It's because you're using a local crate
// after yarn dev, wasm-pack plugin will install my-crate for you

init().then(() => {
  console.log("init wasm-pack");
  greet("from vite!");
});
*/
