import { useEffect, useRef, type ReactNode } from "react";
import { useSheetClose } from "@/lib/motion";

export function SheetFrame({
  label,
  onClose,
  children,
}: {
  label: string;
  onClose: () => void;
  children: (close: () => void) => ReactNode;
}) {
  const { closing, close, onTransitionEnd } = useSheetClose(onClose);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [close]);

  return (
    <div
      className={`sheet-backdrop fixed inset-0 z-50 flex items-end justify-center bg-black/70 ${closing ? "is-closing" : ""}`}
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`sheet-panel max-h-[88vh] w-full max-w-lg overflow-auto rounded-t-xl border border-line bg-surface px-4 py-4 ${closing ? "is-closing" : ""}`}
        onClick={(event) => event.stopPropagation()}
        onTransitionEnd={onTransitionEnd}
      >
        {children(close)}
      </div>
    </div>
  );
}

export function Reveal({
  cue,
  className,
  children,
}: {
  cue: string;
  className?: string;
  children: ReactNode;
}) {
  const ready = useRef(false);
  useEffect(() => {
    ready.current = true;
  }, []);
  return (
    <div
      key={cue}
      className={[ready.current ? "section-open" : "", className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}

export function Collapse({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div className={`collapse-panel ${open ? "is-open" : ""}`} inert={open ? undefined : true}>
      <div className="collapse-inner">{children}</div>
    </div>
  );
}

export function MotionSwap({
  cue,
  className,
  children,
}: {
  cue: string | number;
  className?: string;
  children: ReactNode;
}) {
  const ready = useRef(false);
  useEffect(() => {
    ready.current = true;
  }, []);
  const swap = ready.current ? "motion-swap" : "";
  return (
    <span key={cue} className={[swap, className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
