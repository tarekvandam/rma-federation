// Helpers for the gallery. Images live on an external host (Cloudinary); we store only the link.

export function isValidImageUrl(url: string) {
  try {
    const u = new URL(url.trim());
    return u.protocol === "https:" && url.trim().length <= 1000;
  } catch {
    return false;
  }
}

// For Cloudinary links, ask for a smaller, optimized copy (saves the free bandwidth).
// Other hosts are shown as they are.
export function thumbUrl(url: string, width = 700) {
  const marker = "/image/upload/";
  try {
    const u = new URL(url);
    if (u.hostname !== "res.cloudinary.com") return url;
    const i = url.indexOf(marker);
    if (i === -1) return url;
    const rest = url.slice(i + marker.length);
    if (/^(?:[a-z]{1,3}_[^/]+,?)+\//.test(rest)) return url; // already has a transformation
    return url.slice(0, i + marker.length) + `f_auto,q_auto,w_${width}/` + rest;
  } catch {
    return url;
  }
}
