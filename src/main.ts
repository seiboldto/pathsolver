import "./styles/styles.scss";
import App from "./App.svelte";
import "~lib/i18n";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const target = document.querySelector("#app")!;

const app = new App({
  target,
});

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
