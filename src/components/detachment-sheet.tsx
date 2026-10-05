import { X } from "lucide-react";
import { SheetFrame } from "@/components/motion";
import { bearerNames, detachmentById, enhancementsFor } from "@/data/enhancements";
import { ARMY_RULES, katahByName } from "@/data/rules";

export function DetachmentSheet({
  ids,
  onClose,
  armyRules = false,
}: {
  ids: string[];
  onClose: () => void;
  armyRules?: boolean;
}) {
  const detachments = ids.map((id) => detachmentById(id)).filter((item) => item != null);

  if (detachments.length === 0) return null;

  return (
    <SheetFrame label="Detachment rules" onClose={onClose}>
      {(close) => (
        <>
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-2xl">{detachments.length === 1 ? detachments[0]!.name : "Detachments"}</h2>
          <button
            type="button"
            aria-label="Close detachment rules"
            onClick={close}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted"
          >
            <X className="size-5" />
          </button>
        </div>
        {armyRules ? (
          <section className="mt-4">
            <h3 className="text-xs tracking-wide text-gold uppercase">Army rules</h3>
            <ul className="mt-2 flex flex-col gap-4">
              {ARMY_RULES.map((rule) => (
                <li key={rule.name}>
                  <p className="text-sm font-medium">{rule.name}</p>
                  <p className="text-sm text-muted">{rule.rule}</p>
                  {rule.parts ? (
                    <ul className="mt-2 flex flex-col gap-2 border-l border-line pl-3">
                      {rule.parts.map((part) => (
                        <li key={part.name}>
                          <p className="text-sm font-medium">{part.name}</p>
                          <p className="text-sm text-muted">{part.rule}</p>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {armyRules ? <h3 className="mt-6 text-xs tracking-wide text-gold uppercase">Detachment rules</h3> : null}
        <div className="mt-4 flex flex-col gap-8">
          {detachments.map((detachment) => {
            const enhancements = enhancementsFor(detachment.id);
            return (
              <article key={detachment.id} className="flex flex-col gap-4">
                {detachments.length > 1 ? <h3 className="font-display text-xl">{detachment.name}</h3> : null}
                <p className="text-xs text-muted">
                  {detachment.dp} DP
                  {detachment.unique ? ` · Shield Host${detachment.flavor ? ` — ${detachment.flavor}` : ""}` : ""}
                </p>
                <p className="text-sm">Force disposition: {detachment.dispositions.join(", ")}</p>
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
                    {katahByName(detachment.katah.name) ? (
                      <p className="mt-1 text-sm">{katahByName(detachment.katah.name)!.rule}</p>
                    ) : null}
                    <p className="mt-1 text-sm">Additional effect: {detachment.katah.effect}</p>
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
        </>
      )}
    </SheetFrame>
  );
}
