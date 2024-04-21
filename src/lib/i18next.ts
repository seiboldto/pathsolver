import i18next from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const LANGUAGES = [
  { name: "Deutsch", locale: "de" },
  { name: "English", locale: "en" },
  { name: "Français", locale: "fr" },
] as const;

// eslint-disable-next-line import/no-named-as-default-member
i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    load: "languageOnly",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}.json",
    },
  });
