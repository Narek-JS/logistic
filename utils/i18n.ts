import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

// Import all your translation files
import en from "../locales/en.json";
import hy from "../locales/hy.json";

// Create a new i18n instance
const i18n = new I18n();

// Set the supported translations
i18n.translations = {
  en,
  hy,
};

// Set the locale once at the beginning of your app.
const deviceLanguage = getLocales()[0].languageCode;
i18n.locale = deviceLanguage ?? "en";

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

// It will default to English if the device's locale is not available.
i18n.defaultLocale = "en";

export default i18n;
