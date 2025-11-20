"use client";

import { useEffect, useRef, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  const queryRef = useRef(query);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const media =
      typeof window !== "undefined" ? window.matchMedia(query) : null;
    if (!media) return;

    // Only update if query changed (not on first render since initial state is correct)
    if (!isFirstRender.current && queryRef.current !== query) {
      // Update asynchronously to avoid synchronous setState
      queueMicrotask(() => {
        setMatches(media.matches);
      });
    }

    queryRef.current = query;
    isFirstRender.current = false;

    // Create event listener
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    media.addEventListener("change", listener);

    // Clean up
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}
