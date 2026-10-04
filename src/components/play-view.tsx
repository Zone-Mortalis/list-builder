import { useState } from "react";
import { ARMY_RULES } from "@/data/rules";
import { detachmentById, ENHANCEMENTS, enhancementsFor } from "@/data/enhancements";
import { datasheetById } from "@/data/datasheets";
import {
  canTarget,
  keywordsFor,
  PHASES,
  RULE_UPDATES,
  stratagemsFor,
  USING_STRATAGEMS,
  type PhaseId,
  type RosterUnit,
} from "@/data/stratagems";
import { DatasheetView } from "@/components/datasheet-view";

export type PlayEntry = {
  id: string;
  unitId: string;
  name: string;
  models: number;
  cost: number;
  warlord: boolean;
  enhancement?: string;
  gearText?: string;
  gear?: Record<string, string>;
  attachedTo?: string;
};

type Tab = "list" | "army" | "core" | "detachments" | "stratagems";

const TABS: { id: Tab; label: string }[] = [
  { id: "list", label: "List" },
  { id: "army", label: "Army" },
  { id: "core", label: "Core" },
  { id: "detachments", label: "Detachments" },
  { id: "stratagems", label: "Stratagems" },
];

function tableUnits(entries: PlayEntry[]): RosterUnit[] {
  const leaders = new Map<string, PlayEntry>();
  for (const entry of entries) {
    if (entry.attachedTo) leaders.set(entry.attachedTo, entry);
  }
  const attached = new Set([...leaders.values()].map((leader) => leader.id));
  return entries
    .filter((entry) => !attached.has(entry.id))
    .map((entry) => {
      const leader = leaders.get(entry.id);
      const unitIds = leader ? [leader.unitId, entry.unitId] : [entry.unitId];
      const label = leader
        ? `${leader.name}${leader.warlord ? " (Warlord)" : ""} — ${entry.name}${entry.models > 1 ? ` x${entry.models}` : ""}`
        : `${entry.name}${entry.models > 1 ? ` x${entry.models}` : ""}${entry.warlord ? " (Warlord)" : ""}`;
      return {
        key: entry.id,
        label,
        keywords: keywordsFor(unitIds),
        unitIds,
        models: entry.models + (leader ? 1 : 0),
      };
    });
}

export function PlayView({
  name,
  total,
  limit,
  detachments,
  mainDisposition,
  dispositionChoices,
  onMainDisposition,
  entries,
  onBack,
}: {
  name: string;
  total: number;
  limit: number;
  detachments: string[];
  mainDisposition?: string;
  dispositionChoices: string[];
  onMainDisposition: (disposition: string) => void;
  entries: PlayEntry[];
  onBack: () => void;
}) {
  const [tab, setTab] = useState<Tab>("list");
  const [phase, setPhase] = useState<PhaseId | "all">("all");
  const [listFilter, setListFilter] = useState<"all" | "enhancements">("all");
  const [sheetEntry, setSheetEntry] = useState<string | null>(null);
  const units = tableUnits(entries);
  const sheets = detachments.map((id) => detachmentById(id)).filter((item) => item != null);
  const stratagems = stratagemsFor(detachments).filter((stratagem) =>
    phase === "all" ? true : phase === "any" ? stratagem.phases.includes("any") : stratagem.phases.includes(phase) || stratagem.phases.includes("any"),
  );
  const attachedBodies = new Set(entries.flatMap((entry) => (entry.attachedTo ? [entry.attachedTo] : [])));
  const shown = listFilter === "enhancements" ? entries.filter((entry) => entry.enhancement) : entries;
  const openEntry = entries.find((entry) => entry.id === sheetEntry);
  const openEnhancement = openEntry?.enhancement
    ? ENHANCEMENTS.find((enhancement) => enhancement.name === openEntry.enhancement)
    : undefined;
  const main =
    mainDisposition && dispositionChoices.includes(mainDisposition)
      ? mainDisposition
      : dispositionChoices.length === 1
        ? dispositionChoices[0]
        : undefined;

  return (
    <main className="page-enter mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-4 px-4 py-5 sm:px-6">
      <header className="sticky top-0 z-10 -mx-4 border-b border-line bg-bg px-4 pb-3 sm:-mx-6 sm:px-6">
        <div className="flex items-start justify-between gap-3 pt-1">
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-wide text-gold uppercase">Playing</p>
            <h1 className="truncate font-display text-2xl sm:text-3xl">{name}</h1>
            <p className="text-sm text-muted">
              {total} pts / {limit} pts
              {sheets.length ? ` · ${sheets.map((sheet) => sheet.name).join(", ")}` : ""}
            </p>
            {main ? <p className="text-sm text-muted">Main disposition: {main}</p> : null}
          </div>
          <button type="button" onClick={onBack} className="min-h-11 shrink-0 rounded-lg border border-line px-3 py-2 text-sm">
            Back
          </button>
        </div>
        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`min-h-11 shrink-0 rounded-lg border px-3 py-2 text-sm ${
                tab === item.id ? "border-gold bg-gold text-bg" : "border-line bg-surface"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <div key={tab} className="section-open">
      {tab === "list" ? (
        entries.length === 0 ? (
          <p className="text-sm text-muted">Add a unit.</p>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setListFilter("all")}
                className={`min-h-11 rounded-lg border px-3 text-sm ${listFilter === "all" ? "border-gold text-gold" : "border-line text-muted"}`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setListFilter("enhancements")}
                className={`min-h-11 rounded-lg border px-3 text-sm ${listFilter === "enhancements" ? "border-gold text-gold" : "border-line text-muted"}`}
              >
                Enhancements
              </button>
            </div>
            {shown.length === 0 ? (
              <p className="text-sm text-muted">No enhancements selected.</p>
            ) : (
              <ol className="flex flex-col gap-2">
                {shown.map((entry) => {
                  const enhancement = entry.enhancement
                    ? ENHANCEMENTS.find((item) => item.name === entry.enhancement)
                    : undefined;
                  return (
                    <li
                      key={entry.id}
                      className={`rounded-lg border border-line bg-surface px-3 py-3 ${attachedBodies.has(entry.id) ? "ml-4 border-l-gold" : ""}`}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-sm font-medium">
                          {listFilter === "enhancements" && enhancement ? enhancement.name : entry.name}
                          {listFilter === "all" && entry.models > 1 ? ` x${entry.models}` : ""}
                          {listFilter === "all" && entry.warlord ? " (Warlord)" : ""}
                          {listFilter === "all" && entry.enhancement ? ` (${entry.enhancement})` : ""}
                        </p>
                        <p className="text-sm text-gold">{listFilter === "enhancements" && enhancement ? `+${enhancement.points} pts` : `${entry.cost} pts`}</p>
                      </div>
                      {listFilter === "enhancements" ? (
                        <>
                          <p className="mt-1 text-sm">
                            {entry.name}
                            {entry.models > 1 ? ` x${entry.models}` : ""}
                            {entry.warlord ? " (Warlord)" : ""}
                          </p>
                          {enhancement ? <p className="mt-1 text-sm text-muted">{enhancement.rule}</p> : null}
                        </>
                      ) : entry.gearText ? (
                        <p className="mt-1 text-sm text-muted">{entry.gearText}</p>
                      ) : null}
                      {datasheetById(entry.unitId) ? (
                        <button
                          type="button"
                          onClick={() => setSheetEntry(entry.id)}
                          className="mt-1 inline-flex min-h-11 items-center text-xs text-gold"
                        >
                          Datasheet
                        </button>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        )
      ) : null}

      {tab === "army" ? (
        <div className="flex flex-col gap-6">
          <ul className="flex flex-col gap-4">
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
        </div>
      ) : null}

      {tab === "core" ? (
        <section>
          <h2 className="text-xs tracking-wide text-gold uppercase">Rules updates</h2>
          <ul className="mt-2 flex flex-col gap-2">
            {RULE_UPDATES.map((rule) => (
              <li key={rule} className="text-sm text-muted">
                {rule}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tab === "detachments" ? (
        sheets.length === 0 ? (
          <p className="text-sm text-muted">No detachments selected.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {dispositionChoices.length > 1 ? (
              <label className="flex w-fit max-w-full flex-col items-start text-xs text-muted">
                Main disposition
                <select
                  aria-label="Main disposition"
                  value={main ?? ""}
                  onChange={(event) => onMainDisposition(event.target.value)}
                  className="weapon-select mt-1 h-8 max-w-full rounded-lg border border-line bg-bg px-2 text-xs text-fg"
                >
                  <option value="" disabled>
                    Choose
                  </option>
                  {dispositionChoices.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
            {sheets.map((sheet) => {
              const taken = enhancementsFor(sheet.id).filter((enhancement) =>
                entries.some((entry) => entry.enhancement === enhancement.name),
              );
              return (
                <article key={sheet.id} className="flex flex-col gap-3">
                  <h2 className="font-display text-2xl">{sheet.name}</h2>
                  <p className="text-xs text-muted">
                    {sheet.dp} DP{sheet.unique ? " · Shield Host" : ""}
                  </p>
                  <section>
                    <h3 className="text-xs tracking-wide text-gold uppercase">Force disposition</h3>
                    <p className="mt-1 text-sm">
                      {sheet.dispositions.map((name) => (name === main ? `${name} (Main)` : name)).join(", ")}
                    </p>
                  </section>
                  {sheet.rule ? (
                    <section>
                      <h3 className="text-xs tracking-wide text-gold uppercase">{sheet.rule.name}</h3>
                      <p className="mt-1 text-sm">{sheet.rule.text}</p>
                    </section>
                  ) : null}
                  {sheet.katah ? (
                    <section>
                      <h3 className="text-xs tracking-wide text-gold uppercase">Favoured Ka’tah · {sheet.katah.name}</h3>
                      <p className="mt-1 text-sm">{sheet.katah.effect}</p>
                    </section>
                  ) : null}
                  {taken.length > 0 ? (
                    <section>
                      <h3 className="text-xs tracking-wide text-gold uppercase">In this list</h3>
                      <ul className="mt-2 flex flex-col gap-2">
                        {taken.map((enhancement) => (
                          <li key={enhancement.id}>
                            <p className="text-sm font-medium">{enhancement.name}</p>
                            <p className="text-sm text-muted">{enhancement.rule}</p>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}
                </article>
              );
            })}
          </div>
        )
      ) : null}

      {tab === "stratagems" ? (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted">{USING_STRATAGEMS}</p>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            <button
              type="button"
              onClick={() => setPhase("all")}
              className={`min-h-11 shrink-0 rounded-lg border px-3 py-2 text-sm ${phase === "all" ? "border-gold text-gold" : "border-line text-muted"}`}
            >
              All
            </button>
            {PHASES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPhase(item.id)}
                className={`min-h-11 shrink-0 rounded-lg border px-3 py-2 text-sm ${phase === item.id ? "border-gold text-gold" : "border-line text-muted"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <ul className="flex flex-col gap-3">
            {stratagems.map((stratagem) => {
              const matches = units.filter((unit) => canTarget(stratagem, unit));
              const phaseLabels = stratagem.phases.map((id) => PHASES.find((item) => item.id === id)?.label ?? id);
              return (
                <li key={stratagem.id} className="rounded-lg border border-line bg-surface px-3 py-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-sm font-medium">{stratagem.name}</p>
                    <p className="shrink-0 text-sm text-gold">{stratagem.cp} CP</p>
                  </div>
                  <p className="text-xs text-gold">
                    {stratagem.source} · {phaseLabels.join(", ")}
                  </p>
                  <p className="mt-2 text-sm">{stratagem.when}</p>
                  <p className="mt-1 text-sm text-muted">{stratagem.effect}</p>
                  {stratagem.restrictions ? <p className="mt-1 text-xs text-muted">{stratagem.restrictions}</p> : null}
                  <p className="mt-3 text-xs tracking-wide text-muted uppercase">Can target</p>
                  {matches.length === 0 ? (
                    <p className="text-sm text-muted">No unit in this list.</p>
                  ) : (
                    <ul className="mt-1">
                      {matches.map((unit) => (
                        <li key={unit.key} className="text-sm">
                          {unit.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      </div>

      {openEntry ? (
        <DatasheetView
          unitId={openEntry.unitId}
          unitName={openEntry.name}
          gear={openEntry.gear}
          enhancement={openEnhancement ? { name: openEnhancement.name, rule: openEnhancement.rule } : undefined}
          listOnly
          onClose={() => setSheetEntry(null)}
        />
      ) : null}
    </main>
  );
}
