// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationAr from "./locales/ar.json";
import translationEn from "./locales/en.json";

const resources = {
  en: {
    translation: translationEn,
  },
  ar: {
    translation: translationAr,
  },
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: "ar", // Default language
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
