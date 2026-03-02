import { useEffect, useRef, type RefObject } from "react";

/**
 * Calls `callback` when a click occurs outside the given ref(s).
 * Optionally exclude a second ref (e.g. a toggle button).
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  excludeRef?: RefObject<HTMLElement | null>
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        (!excludeRef?.current || !excludeRef.current.contains(e.target as Node))
      ) {
        callbackRef.current();
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [ref, excludeRef]);
}
