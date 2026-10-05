import { X } from "lucide-react";
import { SheetFrame } from "@/components/motion";
import { ARMY_RULES, FLY_RULE, KEYWORD_RULES, WEAPON_ABILITIES } from "@/data/rules";
import { RULE_UPDATES, USING_STRATAGEMS } from "@/data/stratagems";

export function CoreRules({ onClose, army = false }: { onClose: () => void; army?: boolean }) {
  const abilities = WEAPON_ABILITIES.filter((ability) => ability.key !== "pistol");

  return (
    <SheetFrame label={army ? "Army rules" : "Core rules"} onClose={onClose}>
      {(close) => (
        <>
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-2xl">{army ? "Army rules" : "Core rules"}</h2>
          <button
            type="button"
            aria-label={army ? "Close army rules" : "Close core rules"}
            onClick={close}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted"
          >
            <X className="size-5" />
          </button>
        </div>
        {army ? (
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
        ) : (
          <>
            <section className="mt-4">
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
          </>
        )}
        </>
      )}
    </SheetFrame>
  );
}
