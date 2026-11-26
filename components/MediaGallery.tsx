"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { thumbUrl } from "@/lib/gallery";

type Item = { id: number; image_url: string; caption: string };

function GalleryImage({ item, index, onOpen }: { item: Item; index: number; onOpen: (i: number) => void }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // The picture may finish loading before the page wakes up; catch that case.
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) setLoaded(true);
  }, []);
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={item.caption || "Open photo"}
      className="group relative mb-5 block w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 text-start break-inside-avoid shadow-lg shadow-black/40 transition-all duration-500 hover:-translate-y-1 hover:border-red-600/50 hover:shadow-red-900/20 focus:outline-none focus-visible:border-red-500"
    >
      <div className={`min-h-40 bg-zinc-800 ${loaded ? "" : "animate-pulse"}`}>
        <img
          ref={imgRef}
          src={thumbUrl(item.image_url, 700)}
          alt={item.caption || "RMA gallery"}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          className={`block w-full h-auto transition-all duration-700 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        {item.caption && <p className="text-sm font-medium text-white">{item.caption}</p>}
        <span className="mt-1 text-xs uppercase tracking-[0.25em] text-red-400">View</span>
      </div>
      <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
      </span>
    </button>
  );
}

export default function MediaGallery({ items }: { items: Item[] }) {
  const [current, setCurrent] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const count = items.length;

  const close = useCallback(() => setCurrent(null), []);
  const next = useCallback(() => setCurrent((c) => (c === null ? c : (c + 1) % count)), [count]);
  const prev = useCallback(() => setCurrent((c) => (c === null ? c : (c - 1 + count) % count)), [count]);

  useEffect(() => {
    if (current === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [current, close, next, prev]);

  // Warm the browser cache for the neighbours so next/previous feel instant.
  useEffect(() => {
    if (current === null || count < 2) return;
    [(current + 1) % count, (current - 1 + count) % count].forEach((i) => {
      const img = new Image();
      img.src = thumbUrl(items[i].image_url, 1600);
    });
  }, [current, count, items]);

  const open = current === null ? null : items[current];

  return (
    <>
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
        {items.map((item, i) => (
          <GalleryImage key={item.id} item={item} index={i} onOpen={setCurrent} />
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-sm animate-[fadeUp_0.3s_ease-out_both]"
          onClick={close}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button type="button" aria-label="Close" onClick={close}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-zinc-800/90 text-2xl text-white transition hover:bg-red-600">×</button>
          <span className="absolute left-4 top-5 text-sm tracking-widest text-gray-400">{(current as number) + 1} / {count}</span>
          {count > 1 && (
            <>
              <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-800/80 text-2xl text-white transition hover:bg-red-600 sm:left-6">‹</button>
              <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-800/80 text-2xl text-white transition hover:bg-red-600 sm:right-6">›</button>
            </>
          )}
          <img
            key={open.id}
            src={thumbUrl(open.image_url, 1600)}
            alt={open.caption || "RMA gallery"}
            referrerPolicy="no-referrer"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl shadow-black animate-[fadeUp_0.35s_ease-out_both]"
          />
          {open.caption && <p className="mt-4 max-w-2xl text-center text-gray-200" onClick={(e) => e.stopPropagation()}>{open.caption}</p>}
        </div>
      )}
    </>
  );
}
