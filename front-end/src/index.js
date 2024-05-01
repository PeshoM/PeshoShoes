import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router.tsx";
import i18 from "i18next";
import { initReactI18next } from "react-i18next";
import translationBG from "./locales/bg.json";

i18
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      bg: {
        translation: translationBG,
      },
    },
    lng: "bg", // default language
    fallbackLng: "en", // fallback language if translation not found
    interpolation: {
      escapeValue: false, // react already safe from xss
    },
  });
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Router />);
