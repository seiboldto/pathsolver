import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const LANGUAGES = [
  { name: "Deutsch", locale: "de" },
  { name: "English", locale: "en" },
] as const;

const backend = new Backend(null, { loadPath: "/locales/{{lng}}.json" });
const languageDetector = new LanguageDetector(null, {
  convertDetectedLanguage: (lng) => lng.split("-")[0],
  htmlTag: undefined,
});

// eslint-disable-next-line import/no-named-as-default-member
i18next
  .use(backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: LANGUAGES.map((l) => l.locale),
    load: "languageOnly",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

i18next.services.formatter?.add("zero-indicing", (value) => {
  if (typeof value === "number") return value + 1;
  return value;
});
