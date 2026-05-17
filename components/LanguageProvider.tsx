"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultLocale, isRightToLeft, Locale, supportedLocales } from "@/lib/i18n";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  rtl: boolean;
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: defaultLocale,
  setLocale: () => {},
  rtl: false,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale;
  }

  const stored = window.localStorage.getItem("rma-locale") as Locale | null;
  if (stored && supportedLocales.includes(stored)) {
    return stored;
  }

  const browserLocale = window.navigator.language.split("-")[0] as Locale;
  if (supportedLocales.includes(browserLocale)) {
    return browserLocale;
  }

  return defaultLocale;
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    setLocaleState(getInitialLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRightToLeft(locale) ? "rtl" : "ltr";
    window.localStorage.setItem("rma-locale", locale);
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale: setLocaleState, rtl: isRightToLeft(locale) }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
