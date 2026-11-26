"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { defaultLocale, isRightToLeft, Locale, supportedLocales } from "@/lib/i18n";
import { isArUrl, isTranslatedPath, stripAr, toArPath } from "@/lib/localePath";

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

function getPreferredLocale(): Locale {
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

export default function LanguageProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();
  const pathname = usePathname();

  // The URL decides the language on translated pages (/ar/... is Arabic).
  // Only the browser, never the server, may suggest Arabic to a visitor on an English URL.
  useEffect(() => {
    const path = window.location.pathname;
    if (isArUrl(path)) {
      window.localStorage.setItem("rma-locale", "ar");
      setLocaleState("ar");
      return;
    }
    const preferred = getPreferredLocale();
    if (isTranslatedPath(path)) {
      if (preferred === "ar") {
        router.replace(toArPath(path));
        return;
      }
      setLocaleState("en");
      return;
    }
    setLocaleState(preferred);
  }, [pathname, router]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRightToLeft(locale) ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      window.localStorage.setItem("rma-locale", next);
      setLocaleState(next);
      const path = window.location.pathname;
      if (next === "ar" && isTranslatedPath(path)) {
        router.push(toArPath(path));
      } else if (next === "en" && isArUrl(path)) {
        router.push(stripAr(path));
      }
    },
    [router],
  );

  const value = useMemo(
    () => ({ locale, setLocale, rtl: isRightToLeft(locale) }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
