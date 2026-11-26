// Pages that have a full Arabic version under /ar
export const AR_PATHS = [
  "/",
  "/about",
  "/championships",
  "/contact",
  "/membership",
  "/promotion",
  "/rankings",
];

export function isArUrl(path: string) {
  return path === "/ar" || path.startsWith("/ar/");
}

export function stripAr(path: string) {
  if (!isArUrl(path)) return path;
  return path.replace(/^\/ar/, "") || "/";
}

export function isTranslatedPath(path: string) {
  const clean = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return AR_PATHS.includes(clean);
}

export function toArPath(path: string) {
  const clean = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return clean === "/" ? "/ar" : `/ar${clean}`;
}

export function localizeHref(href: string, locale: string) {
  if (locale !== "ar") return href;
  return isTranslatedPath(href) ? toArPath(href) : href;
}
