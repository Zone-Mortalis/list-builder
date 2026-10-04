import { useEffect } from "react";
import { X } from "lucide-react";
import { ARMY_RULES, FLY_RULE, KEYWORD_RULES, WEAPON_ABILITIES } from "@/data/rules";
import { RULE_UPDATES, USING_STRATAGEMS } from "@/data/stratagems";

export function CoreRules({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const abilities = WEAPON_ABILITIES.filter((ability) => ability.key !== "pistol");

  return (
    <div className="sheet-backdrop fixed inset-0 z-50 flex items-end justify-center bg-black/70" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Core rules"
        className="sheet-panel max-h-[88vh] w-full max-w-lg overflow-auto rounded-t-xl border border-line bg-surface px-4 py-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-2xl">Core rules</h2>
          <button
            type="button"
            aria-label="Close core rules"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted"
          >
            <X className="size-5" />
          </button>
        </div>
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
        <section className="mt-6">
          <h3 className="text-xs tracking-wide text-gold uppercase">Rules updates</h3>
          <ul className="mt-2 flex flex-col gap-2">
            {RULE_UPDATES.map((rule) => (
              <li key={rule} className="text-sm text-muted">
                {rule}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm font-medium">Using Stratagems</p>
          <p className="text-sm text-muted">{USING_STRATAGEMS}</p>
        </section>
        <section className="mt-6">
          <h3 className="text-xs tracking-wide text-gold uppercase">Keywords</h3>
          <ul className="mt-2 flex flex-col gap-2">
            {KEYWORD_RULES.map((rule) => (
              <li key={rule} className="text-sm">
                {rule}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm font-medium">Fly</p>
          <p className="text-sm text-muted">{FLY_RULE}</p>
        </section>
        <section className="mt-6">
          <h3 className="text-xs tracking-wide text-gold uppercase">Weapon abilities</h3>
          <ul className="mt-2 flex flex-col gap-3">
            {abilities.map((ability) => (
              <li key={ability.key}>
                <p className="text-sm font-medium">{ability.name}</p>
                <p className="text-sm text-muted">{ability.rule}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
