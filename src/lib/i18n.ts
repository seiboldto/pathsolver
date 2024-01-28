import { addMessages, init } from "svelte-i18n";

import enUS from "~assets/locales/en-US.json";

addMessages("en-US", enUS);

void init({ fallbackLocale: "en-US" });
