import { useCallback, useEffect, useRef, useState, type TransitionEvent } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

/** Keep in sync with --motion-duration and --motion-ease in styles.css. */
const LIST_MOTION = {
  duration: 180,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  disrespectUserMotionPreference: true,
} as const;

export function motionEnabled(): boolean {
  if (typeof document === "undefined") return false;
  const mode = document.documentElement.dataset.motion;
  if (mode === "on") return false;
  if (mode === "off") return true;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useListMotion<T extends HTMLElement>() {
  const [parent, enable] = useAutoAnimate<T>(LIST_MOTION);
  useEffect(() => {
    const sync = () => enable(motionEnabled());
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    media.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, [enable]);
  return parent;
}

export function useSheetClose(onClose: () => void) {
  const [closing, setClosing] = useState(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const close = useCallback(() => {
    if (!motionEnabled()) {
      onCloseRef.current();
      return;
    }
    setClosing(true);
  }, []);

  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(() => onCloseRef.current(), 320);
    return () => window.clearTimeout(timer);
  }, [closing]);

  const onTransitionEnd = (event: TransitionEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== "transform") return;
    if (closing) onCloseRef.current();
  };

  return { closing, close, onTransitionEnd };
}
