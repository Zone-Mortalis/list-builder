import { useEffect } from "react";
import { X } from "lucide-react";
import { bearerNames, detachmentById, enhancementsFor } from "@/data/enhancements";

export function DetachmentSheet({ ids, onClose }: { ids: string[]; onClose: () => void }) {
  const detachments = ids.map((id) => detachmentById(id)).filter((item) => item != null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (detachments.length === 0) return null;

  return (
    <div className="sheet-backdrop fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:items-center" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Detachment rules"
        className="sheet-panel max-h-[88vh] w-full max-w-lg overflow-auto rounded-t-xl border border-line bg-surface px-4 py-4 sm:rounded-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-2xl">{detachments.length === 1 ? detachments[0]!.name : "Detachments"}</h2>
          <button
            type="button"
            aria-label="Close detachment rules"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-8">
          {detachments.map((detachment) => {
            const enhancements = enhancementsFor(detachment.id);
            return (
              <article key={detachment.id} className="flex flex-col gap-4">
                {detachments.length > 1 ? <h3 className="font-display text-xl">{detachment.name}</h3> : null}
                <p className="text-xs text-muted">
                  {detachment.dp} DP{detachment.unique ? " · Shield Host" : ""}
                </p>
                {detachment.rule ? (
                  <section>
                    <h3 className="text-xs tracking-wide text-gold uppercase">{detachment.rule.name}</h3>
                    <p className="mt-1 text-sm">{detachment.rule.text}</p>
                  </section>
                ) : (
                  <p className="text-sm text-muted">Detachment rule not entered yet.</p>
                )}
                {detachment.katah ? (
                  <section>
                    <h3 className="text-xs tracking-wide text-gold uppercase">Favoured Ka’tah · {detachment.katah.name}</h3>
                    <p className="mt-1 text-sm">{detachment.katah.effect}</p>
                  </section>
                ) : null}
                {enhancements.length > 0 ? (
                  <section>
                    <h3 className="text-xs tracking-wide text-gold uppercase">Enhancements</h3>
                    <ul className="mt-2 flex flex-col gap-3">
                      {enhancements.map((enhancement) => (
                        <li key={enhancement.id}>
                          <p className="text-sm font-medium">
                            {enhancement.name} · {enhancement.points} pts
                            {enhancement.once ? " · one per army" : enhancement.upgrade ? " · upgrade" : ""}
                          </p>
                          <p className="text-sm text-muted">{enhancement.rule}</p>
                          <p className="text-xs text-muted">{bearerNames(enhancement.targets)}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}
                {detachment.stratagems.length > 0 ? (
                  <section>
                    <h3 className="text-xs tracking-wide text-gold uppercase">Stratagems</h3>
                    <ul className="mt-2 flex flex-col gap-3">
                      {detachment.stratagems.map((stratagem) => (
                        <li key={stratagem.name}>
                          <p className="text-sm font-medium">
                            {stratagem.name} · {stratagem.cp} CP
                          </p>
                          <p className="text-xs text-gold">{stratagem.when}</p>
                          <p className="text-sm text-muted">{stratagem.rule}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
