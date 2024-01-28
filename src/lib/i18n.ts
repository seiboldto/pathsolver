import enUS from "../assets/locales/en-US.json";
import { addMessages, init } from "svelte-i18n";

addMessages("en-US", enUS);

init({ fallbackLocale: "en-US" });
