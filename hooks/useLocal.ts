import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { useMemo, useState } from "react";
import en from "../locales/en.json";
import hy from "../locales/hy.json";

// This utility type can remain the same
type TranslationPaths<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${TranslationPaths<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

export type TranslationKey = TranslationPaths<typeof en>;

const i18n = new I18n({
  en,
  hy,
});

// Set the initial locale
i18n.locale = getLocales()[0].languageCode ?? "en";
i18n.enableFallback = true;
i18n.defaultLocale = "en";

export const useLocale = () => {
  const [locale, setLocaleState] = useState(i18n.locale);

  const localeUtils = useMemo(
    () => ({
      t: (scope: TranslationKey, options?: object) =>
        i18n.t(scope, { ...options, locale }),
      setLocale: (newLocale: "en" | "hy") => {
        i18n.locale = newLocale;
        setLocaleState(newLocale);
      },
      locale,
    }),
    [locale]
  );

  return localeUtils;
};
