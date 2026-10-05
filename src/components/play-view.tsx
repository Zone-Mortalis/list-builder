import { useState } from "react";
import { Reveal } from "@/components/motion";
import { useListMotion } from "@/lib/motion";
import { ARMY_RULES, katahByName } from "@/data/rules";
import { detachmentById, ENHANCEMENTS, enhancementsFor } from "@/data/enhancements";
import { datasheetById } from "@/data/datasheets";
import { MISSIONS, matchedPair, matchupText, missionByName, type MissionAction, type MissionCard } from "@/data/missions";
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
import { isSupport } from "@/data/units";
import { DatasheetView } from "@/components/datasheet-view";

export type PlayEntry = {
  id: string;
  unitId: string;
  name: string;
  models: number;
  cost: number;
  warlord: boolean;
  enhancement?: string;
  enhancementId?: string;
  enhancementWeapon?: string;
  gearText?: string;
  gear?: Record<string, string>;
  attachedTo?: string;
};

type Tab = "list" | "army" | "core" | "detachments" | "mission" | "stratagems";

const TABS: { id: Tab; label: string }[] = [
  { id: "list", label: "List" },
  { id: "army", label: "Army" },
  { id: "core", label: "Core" },
  { id: "detachments", label: "Detachments" },
  { id: "mission", label: "Mission" },
  { id: "stratagems", label: "Stratagems" },
];

function bodyguardFor(entry: PlayEntry, entries: readonly PlayEntry[]) {
  if (!entry.attachedTo) return undefined;
  const body = entries.find((candidate) => candidate.id === entry.attachedTo);
  return body ? { unitId: body.unitId, gear: body.gear } : undefined;
}

function companionsOf(bodyId: string, entries: readonly PlayEntry[]): PlayEntry[] {
  return entries
    .filter((entry) => entry.attachedTo === bodyId)
    .sort((left, right) => Number(isSupport(left.unitId)) - Number(isSupport(right.unitId)));
}

function tableUnits(entries: PlayEntry[]): RosterUnit[] {
  const attached = new Set(entries.flatMap((entry) => (entry.attachedTo ? [entry.id] : [])));
  return entries
    .filter((entry) => !attached.has(entry.id))
    .map((entry) => {
      const companions = companionsOf(entry.id, entries);
      const unitIds = [...companions.map((companion) => companion.unitId), entry.unitId];
      const names = companions.map((companion) => `${companion.name}${companion.warlord ? " (Warlord)" : ""}`);
      const label = companions.length
        ? `${names.join(" & ")} — ${entry.name}${entry.models > 1 ? ` x${entry.models}` : ""}`
        : `${entry.name}${entry.models > 1 ? ` x${entry.models}` : ""}${entry.warlord ? " (Warlord)" : ""}`;
      return {
        key: entry.id,
        label,
        keywords: keywordsFor(unitIds),
        unitIds,
        models: entry.models + companions.reduce((sum, companion) => sum + companion.models, 0),
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
  onHome,
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
  onHome: () => void;
}) {
  const playListRef = useListMotion<HTMLOListElement>();
  const stratagemRef = useListMotion<HTMLUListElement>();
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
  const main =
    mainDisposition && dispositionChoices.includes(mainDisposition)
      ? mainDisposition
      : dispositionChoices.length === 1
        ? dispositionChoices[0]
        : undefined;

  return (
    <main className="page-enter mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-4 px-4 py-5">
      <header className="sticky top-0 z-10 -mx-4 border-b border-line bg-bg px-4 pb-3">
        <div className="flex items-center justify-between gap-3 pt-1">
          <button type="button" onClick={onHome} className="min-h-11 shrink-0 rounded-lg border border-line px-3 py-2 text-sm">
            Home
          </button>
          <button type="button" onClick={onBack} className="min-h-11 shrink-0 rounded-lg border border-line px-3 py-2 text-sm">
            Back
          </button>
        </div>
        <div className="min-w-0 pt-3">
            <p className="text-xs font-medium tracking-wide text-gold uppercase">Playing</p>
            <h1 className="truncate font-display text-2xl">{name}</h1>
            <p className="text-sm text-muted">
              {total} pts / {limit} pts
              {sheets.length ? ` · ${sheets.map((sheet) => sheet.name).join(", ")}` : ""}
            </p>
            {main ? <p className="text-sm text-muted">Main disposition: {main}</p> : null}
        </div>
        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
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
            {shown.length === 0 ? <p className="text-sm text-muted">No enhancements selected.</p> : null}
              <ol ref={playListRef} className="flex flex-col gap-2">
                {shown.map((entry) => {
                  const enhancement = entry.enhancement
                    ? ENHANCEMENTS.find((item) => item.name === entry.enhancement)
                    : undefined;
                  return (
                    <li
                      key={entry.id}
                      className={`motion-card rounded-lg border border-line bg-surface px-3 py-3 ${attachedBodies.has(entry.id) ? "ml-4 border-l-gold" : ""}`}
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="min-w-0 text-sm font-medium break-words">
                          {listFilter === "enhancements" && enhancement ? enhancement.name : entry.name}
                          {listFilter === "all" && entry.models > 1 ? ` x${entry.models}` : ""}
                          {listFilter === "all" && entry.warlord ? " (Warlord)" : ""}
                          {listFilter === "all" && entry.enhancement ? ` (${entry.enhancement})` : ""}
                        </p>
                        <p className="shrink-0 text-sm text-gold">{listFilter === "enhancements" && enhancement ? `+${enhancement.points} pts` : `${entry.cost} pts`}</p>
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
                    {sheet.dp} DP
                    {sheet.unique ? ` · Shield Host${sheet.flavor ? ` — ${sheet.flavor}` : ""}` : ""}
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
                      {katahByName(sheet.katah.name) ? (
                        <p className="mt-1 text-sm">{katahByName(sheet.katah.name)!.rule}</p>
                      ) : null}
                      <p className="mt-1 text-sm">Additional effect: {sheet.katah.effect}</p>
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

      {tab === "mission" ? <MissionTab main={main} /> : null}

      {tab === "stratagems" ? (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted">{USING_STRATAGEMS}</p>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
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
          <ul ref={stratagemRef} className="flex flex-col gap-3">
            {stratagems.map((stratagem) => {
              const matches = units.filter((unit) => canTarget(stratagem, unit));
              const phaseLabels = stratagem.phases.map((id) => PHASES.find((item) => item.id === id)?.label ?? id);
              return (
                <li key={stratagem.id} className="motion-card rounded-lg border border-line bg-surface px-3 py-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="min-w-0 text-sm font-medium break-words">{stratagem.name}</p>
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
          models={openEntry.models}
          gear={openEntry.gear}
          enhancementId={openEntry.enhancementId}
          enhancementWeapon={openEntry.enhancementWeapon}
          bodyguard={bodyguardFor(openEntry, entries)}
          listOnly
          onClose={() => setSheetEntry(null)}
        />
      ) : null}
    </main>
  );
}

function MissionTab({ main }: { main?: string }) {
  const [theirName, setTheirName] = useState<string | null>(null);
  const yourName = main ?? "";
  const opponent = theirName ?? MISSIONS.find((mission) => mission.name !== yourName)?.name ?? yourName;
  const yours = missionByName(yourName);
  const theirs = missionByName(opponent);
  const pair = matchedPair(yourName, opponent);

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <p className="text-sm text-muted">Each player scores only their own card.</p>
      <div className="flex min-w-0 flex-col gap-3">
        <p className="text-sm">
          <span className="text-xs tracking-wide text-gold uppercase">Your disposition</span>
          <span className="mt-1 block">{yourName || "Choose a main disposition on the list."}</span>
        </p>
        {yours ? <p className="text-sm text-muted">{yours.summary}</p> : null}
      </div>
      {yours && theirs && pair ? (
        <Reveal cue={`${yours.name}-${theirs.name}`} className="flex min-w-0 flex-col gap-6">
          <DispositionPick
            label="Their disposition"
            value={opponent}
            options={MISSIONS.map((mission) => mission.name)}
            onChange={setTheirName}
          />
          <p className="text-sm text-muted">{theirs.summary}</p>
          <section>
            <h2 className="text-xs tracking-wide text-gold uppercase">Disposition</h2>
            <p className="mt-1 text-sm">{matchupText(yours.name, theirs.name)}</p>
          </section>
          <section className="flex min-w-0 flex-col gap-4 border-t border-line pt-4">
            <h2 className="text-sm text-gold">
              {pair.yours.name} vs {pair.theirs.name}
            </h2>
            <div className="grid min-w-0 gap-4 sm:grid-cols-2">
              <MissionCardView side="You" disposition={yours.name} card={pair.yours} />
              <MissionCardView side="Them" disposition={theirs.name} card={pair.theirs} />
            </div>
          </section>
        </Reveal>
      ) : null}
    </div>
  );
}

function DispositionPick({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  if (options.length < 2) {
    return (
      <p className="text-sm">
        <span className="text-xs tracking-wide text-gold uppercase">{label}</span>
        <span className="mt-1 block">{value}</span>
      </p>
    );
  }
  return (
    <label className="flex w-fit max-w-full flex-col items-start text-xs text-muted">
      {label}
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="weapon-select mt-1 h-8 max-w-full rounded-lg border border-line bg-bg px-2 text-xs text-fg"
      >
        {options.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}

function MissionActionView({ action }: { action: MissionAction }) {
  const rows = [
    ["Starts", action.starts],
    ["Units", action.units],
    ["Use limit", action.limit],
    ["Completes", action.completes],
    ["Effect", action.effect],
    action.restrictions ? ["Restrictions", action.restrictions] : null,
  ].filter((row): row is [string, string] => row != null);
  return (
    <div className="mt-3">
      <p className="text-sm font-medium">
        {action.name} <span className="text-xs text-gold">{action.kind}</span>
      </p>
      <ul className="mt-1 flex flex-col gap-1">
        {rows.map(([label, value]) => (
          <li key={label} className="min-w-0 text-sm break-words">
            <span className="text-xs text-gold">{label}. </span>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MissionCardView({ side, disposition, card }: { side: string; disposition: string; card: MissionCard }) {
  return (
    <article className="motion-card min-w-0">
      <p className="text-xs tracking-wide text-gold uppercase">
        {side} · {disposition}
      </p>
      <h3 className="mt-1 font-display text-xl">{card.name}</h3>
      <p className="mt-2 text-sm text-muted">{card.flavor}</p>
      {card.rule ? <p className="mt-2 text-sm">{card.rule}</p> : null}
      <ul className="mt-3 flex flex-col gap-3">
        {card.windows.map((window, index) => (
          <li key={`${window.round}-${window.when}-${index}`} className="min-w-0">
            <p className="text-xs tracking-wide text-gold uppercase">{window.round}</p>
            {window.when ? <p className="text-xs text-muted">{window.when}</p> : null}
            {window.scores.map((score) => (
              <p key={`${score.pays}-${score.points}`} className="text-sm break-words">
                {score.alt ? "Or " : ""}
                {score.pays} <span className="text-gold">{score.points}</span>
                {score.cumulative ? <span className="text-gold"> cumulative</span> : null}
              </p>
            ))}
          </li>
        ))}
      </ul>
      {card.action ? <MissionActionView action={card.action} /> : null}
    </article>
  );
}
