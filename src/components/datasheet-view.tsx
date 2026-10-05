import { useEffect, useState } from "react";
import { Check, ChevronDown, Minus, Plus, X } from "lucide-react";
import { datasheetById, KEYWORDS, type WeaponProfile } from "@/data/datasheets";
import { resolvedLoadout } from "@/data/loadouts";
import { explainTag, FLY_RULE } from "@/data/rules";
import { characteristicMarks, keywordMarked, playSheet, weaponMarkKey, type WeaponMark } from "@/data/sheet-mods";
import { gearGroups, gearLine, type GearGroup } from "@/data/units";

function WeaponLine({ weapon, mark }: { weapon: WeaponProfile; mark?: WeaponMark }) {
  const melee = weapon.range === "Melee";
  const skill = weapon.skill.replace(/^BS |^WS /, "");
  const tags = weapon.tags?.split(",").map((tag) => tag.trim()).filter(Boolean) ?? [];
  const [open, setOpen] = useState<string | null>(null);
  const explained = open ? explainTag(open) : undefined;
  const cells: [string, string, boolean][] = [
    ["R", weapon.range, Boolean(mark?.stats.has("range"))],
    [melee ? "WS" : "BS", skill, Boolean(mark?.stats.has("skill"))],
    ["A", weapon.a, Boolean(mark?.stats.has("a"))],
    ["S", weapon.s, Boolean(mark?.stats.has("s"))],
    ["AP", weapon.ap, Boolean(mark?.stats.has("ap"))],
    ["D", weapon.d, Boolean(mark?.stats.has("d"))],
  ];
  return (
    <li className="rounded-lg border border-line bg-bg px-3 py-2">
      <p className={`text-sm font-medium ${mark?.name ? "text-modified" : ""}`}>{weapon.name}</p>
      {tags.length > 0 ? (
        <div className="mt-1 flex flex-wrap gap-1">
          {tags.map((tag) => {
            const added = keywordMarked(mark, tag);
            return explainTag(tag) ? (
              <button
                key={tag}
                type="button"
                onClick={() => setOpen(open === tag ? null : tag)}
                className={`rounded-lg border px-2 py-1 text-xs ${
                  added ? "mark-modified" : open === tag ? "border-gold text-gold" : "border-line text-muted"
                }`}
              >
                {tag}
              </button>
            ) : (
              <span key={tag} className={`inline-flex items-center text-xs ${added ? "text-modified" : "text-muted"}`}>
                {tag}
              </span>
            );
          })}
        </div>
      ) : null}
      {explained ? (
        <p className="text-xs text-muted">
          {explained.only ? `Only against ${explained.only}. ` : ""}
          {explained.rule}
        </p>
      ) : null}
      <dl className="mt-2 grid grid-cols-6 gap-1 text-center">
        {cells.map(([label, value, marked]) => (
          <div key={label} className="min-w-0">
            <dt className="text-[10px] tracking-wide text-gold uppercase">{label}</dt>
            <dd className={`text-xs break-words ${marked ? "text-modified" : ""}`}>{value}</dd>
          </div>
        ))}
      </dl>
    </li>
  );
}

function KeywordLine({ text, marked }: { text: string; marked?: ReadonlySet<string> }) {
  const parts = text.split(",").map((part) => part.trim()).filter(Boolean);
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-1">
      <p className="text-sm">
        {parts.map((part, index) => {
          const hot = marked?.has(part.toLowerCase());
          return (
            <span key={`${part}-${index}`}>
              {index > 0 ? ", " : ""}
              {part === "Fly" ? (
                <button type="button" onClick={() => setOpen((current) => !current)} className={`${hot ? "text-modified" : "text-gold"} underline`}>
                  Fly
                </button>
              ) : (
                <span className={hot ? "text-modified" : undefined}>{part}</span>
              )}
            </span>
          );
        })}
      </p>
      {open ? <p className="mt-1 text-sm text-muted">{FLY_RULE}</p> : null}
    </div>
  );
}

function WeaponBlock({
  title,
  weapons,
  scope,
  marks,
}: {
  title: string;
  weapons: WeaponProfile[];
  scope: "ranged" | "melee";
  marks?: ReadonlyMap<string, WeaponMark>;
}) {
  if (weapons.length === 0) return null;
  return (
    <section>
      <h3 className="text-xs tracking-wide text-gold uppercase">{title}</h3>
      <ul className="mt-2 flex flex-col gap-2">
        {weapons.map((weapon) => (
          <WeaponLine key={`${title}-${weapon.name}`} weapon={weapon} mark={marks?.get(weaponMarkKey(scope, weapon.name))} />
        ))}
      </ul>
    </section>
  );
}

const UNIT_STAT: Record<string, "m" | "t" | "sv" | "w" | "ld" | "oc" | "inv" | undefined> = {
  M: "m",
  T: "t",
  Sv: "sv",
  W: "w",
  Ld: "ld",
  OC: "oc",
  Inv: "inv",
};

function withMarkedKeywords(base: string | undefined, marked: ReadonlySet<string>): string {
  const parts = (base ?? "").split(",").map((part) => part.trim()).filter(Boolean);
  const have = new Set(parts.map((part) => part.toLowerCase()));
  for (const keyword of marked) {
    if (!have.has(keyword.toLowerCase())) parts.push(keyword);
  }
  return parts.join(", ");
}

export function WargearPicker({
  unitId,
  models,
  gear,
  onGear,
}: {
  unitId: string;
  models: number;
  gear?: Record<string, string>;
  onGear: (groupId: string, choiceId: string) => void;
}) {
  const resolved = resolvedLoadout(unitId, models, gear);
  const groups = gearGroups(unitId);
  if (!resolved && groups.length === 0) return null;
  return (
    <div className="mt-2 flex max-w-full min-w-0 flex-col items-start gap-1.5">
      {resolved ? <LoadoutControls unitId={unitId} models={models} gear={gear} resolved={resolved} onGear={onGear} /> : null}
      {groups.map((group) => (
        <GearGroupControl key={group.id} group={group} gear={gear} onGear={onGear} />
      ))}
    </div>
  );
}

function LoadoutControls({
  unitId,
  models,
  gear,
  resolved,
  onGear,
}: {
  unitId: string;
  models: number;
  gear?: Record<string, string>;
  resolved: NonNullable<ReturnType<typeof resolvedLoadout>>;
  onGear: (groupId: string, choiceId: string) => void;
}) {
  const canCount = (id: string, value: number) => resolvedLoadout(unitId, models, { ...gear, [id]: String(value) })?.counts[id] === value;
  return (
    <>
      {resolved.spec.slots.map((slot) => {
        if (slot.kind === "choice") {
          const selected = resolved.choices[slot.id] ?? slot.options[0]?.id ?? "";
          return (
            <label key={slot.id} className="flex w-full min-w-0 flex-col gap-1">
              <span className="text-[10px] tracking-wide text-muted uppercase">{slot.label}</span>
              <WeaponMenu
                group={{ id: slot.id, choices: slot.options.map((option) => ({ id: option.id, name: option.name, points: option.points })) }}
                gear={{ [slot.id]: selected }}
                onGear={onGear}
              />
            </label>
          );
        }
        const count = resolved.counts[slot.id] ?? 0;
        if (slot.fill) {
          return count > 0 ? (
            <p key={slot.id} className="text-xs text-muted">
              {slot.kit.name} x{count}
            </p>
          ) : null;
        }
        return (
          <div key={slot.id} className="flex w-full min-w-0 items-center gap-2">
            <button
              type="button"
              aria-label={`Fewer ${slot.label}`}
              disabled={!canCount(slot.id, count - 1)}
              onClick={() => onGear(slot.id, String(count - 1))}
              className="inline-flex size-8 items-center justify-center rounded-lg border border-line disabled:opacity-40"
            >
              <Minus className="size-3.5" aria-hidden="true" />
            </button>
            <p className="min-w-0 flex-1 text-xs">
              {slot.label}
              <span className="ml-1 tabular-nums text-muted">x{count}</span>
              {slot.kit.points ? <span className="ml-1 text-muted">+{slot.kit.points} pts</span> : null}
            </p>
            <button
              type="button"
              aria-label={`More ${slot.label}`}
              disabled={!canCount(slot.id, count + 1)}
              onClick={() => onGear(slot.id, String(count + 1))}
              className="inline-flex size-8 items-center justify-center rounded-lg border border-line disabled:opacity-40"
            >
              <Plus className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </>
  );
}

function GearGroupControl({
  group,
  gear,
  onGear,
}: {
  group: GearGroup;
  gear?: Record<string, string>;
  onGear: (groupId: string, choiceId: string) => void;
}) {
  if (group.optional) {
    const item = group.choices[0];
    if (!item) return null;
    const on = gear?.[group.id] === item.id;
    return (
      <button
        type="button"
        aria-pressed={on}
        onClick={() => onGear(group.id, on ? "" : item.id)}
        className={`inline-flex max-w-full items-center gap-2 rounded-full border px-1 py-1 pr-3 text-left text-xs ${
          on ? "border-gold bg-gold/15 text-fg" : "border-dashed border-line text-muted"
        }`}
      >
        <span
          className={`grid size-6 shrink-0 place-items-center rounded-full border ${
            on ? "border-gold bg-gold text-bg" : "border-line bg-bg text-muted"
          }`}
        >
          {on ? <Check className="size-3.5" aria-hidden="true" /> : <Plus className="size-3.5" aria-hidden="true" />}
        </span>
        <span className="min-w-0">{item.name}</span>
        <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] tracking-wide uppercase ${on ? "bg-gold text-bg" : "bg-raised text-muted"}`}>
          {item.points ? `+${item.points} pts` : "Optional"}
        </span>
      </button>
    );
  }
  return <WeaponMenu group={group} gear={gear} onGear={onGear} />;
}

function WeaponMenu({
  group,
  gear,
  onGear,
}: {
  group: GearGroup;
  gear?: Record<string, string>;
  onGear: (groupId: string, choiceId: string) => void;
}) {
  const selected = gear?.[group.id] ?? group.choices[0]?.id ?? "";
  const current = group.choices.find((item) => item.id === selected) ?? group.choices[0];
  const label = current ? `${current.name}${current.points ? ` +${current.points} pts` : ""}` : "Weapon";
  return (
    <div className="relative inline-flex max-w-full min-w-0">
      <span className="inline-flex h-8 max-w-full min-w-0 items-center gap-1.5 rounded-lg border border-gold/50 bg-bg px-2 text-xs text-fg shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]">
        <span className="min-w-0 truncate">{label}</span>
        <ChevronDown className="size-3.5 shrink-0 text-gold" aria-hidden="true" />
      </span>
      <select
        aria-label="Weapon"
        value={selected}
        onChange={(event) => onGear(group.id, event.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {group.choices.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
            {item.points ? ` +${item.points} pts` : ""}
          </option>
        ))}
      </select>
    </div>
  );
}

export function DatasheetView({
  unitId,
  unitName,
  models,
  gear,
  enhancementId,
  enhancementWeapon,
  listOnly = false,
  onClose,
}: {
  unitId: string;
  unitName: string;
  models?: number;
  gear?: Record<string, string>;
  enhancementId?: string;
  enhancementWeapon?: string;
  listOnly?: boolean;
  onClose: () => void;
}) {
  const sheet = datasheetById(unitId);
  const keywords = KEYWORDS[unitId];

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!sheet) return null;

  const presented = listOnly ? playSheet({ unitId, models, gear, enhancementId, enhancementWeapon }) : null;
  const marks = listOnly ? characteristicMarks({ unitId, models, gear, enhancementId, enhancementWeapon }) : null;
  const statsSource = presented?.stats ?? sheet.stats;
  const extraProfiles = presented?.profiles ?? sheet.profiles ?? [];
  const blocks = [
    { name: extraProfiles.length ? (sheet.profileName ?? unitName) : "", stats: statsSource, base: sheet.stats },
    ...extraProfiles.map((profile, index) => ({
      name: profile.name,
      stats: profile.stats,
      base: sheet.profiles?.[index]?.stats ?? profile.stats,
    })),
  ];
  const ranged = presented ? presented.ranged : sheet.ranged;
  const melee = presented ? presented.melee : sheet.melee;
  const abilities = presented ? presented.abilities : sheet.abilities;
  const selectedKit = gearLine(unitId, gear, true, models);
  const markedKeywords = new Set([...(marks?.unitKeywords ?? [])].map((keyword) => keyword.toLowerCase()));
  const keywordText = withMarkedKeywords(keywords?.keywords, marks?.unitKeywords ?? new Set());

  return (
    <div className="sheet-backdrop fixed inset-0 z-50 flex items-end justify-center bg-black/70" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${unitName} datasheet`}
        className="sheet-panel max-h-[88vh] w-full max-w-lg overflow-auto rounded-t-xl border border-line bg-surface px-4 py-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-2xl">{unitName}</h2>
          <button type="button" aria-label="Close datasheet" onClick={onClose} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted">
            <X className="size-5" />
          </button>
        </div>
        {blocks.map((block, index) => {
          const profileKey = index === 0 ? "primary" : block.name;
          const markedStats = marks?.unit.get(profileKey);
          const rows = (
            [
              ["M", block.stats.m, block.base.m],
              ["T", block.stats.t, block.base.t],
              ["Sv", block.stats.sv, block.base.sv],
              ["W", block.stats.w, block.base.w],
              ["Ld", block.stats.ld, block.base.ld],
              ["OC", block.stats.oc, block.base.oc],
              block.stats.inv || block.base.inv ? ["Inv", block.stats.inv ?? "—", block.base.inv ?? "—"] : null,
              block.stats.damaged || block.base.damaged ? ["Damaged", block.stats.damaged ?? "—", block.base.damaged ?? "—"] : null,
            ] as ([string, string, string] | null)[]
          ).filter((item): item is [string, string, string] => item != null);
          return (
            <div key={block.name || "profile"} className="mt-3">
              {block.name ? <p className="mb-1 text-xs tracking-wide text-muted uppercase">{block.name}</p> : null}
              <dl className="flex flex-wrap gap-2">
                {rows.map(([label, value]) => {
                  const stat = UNIT_STAT[label];
                  const marked = Boolean(stat && markedStats?.has(stat));
                  return (
                    <div key={label} className="rounded-lg border border-line bg-bg px-2 py-1 text-center">
                      <dt className="text-[10px] tracking-wide text-muted uppercase">{label}</dt>
                      <dd className={`text-sm ${marked ? "text-modified" : ""}`}>{value}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          );
        })}
        <div className="mt-4 flex flex-col gap-4">
          {listOnly && selectedKit ? <p className="text-sm text-muted">{selectedKit}</p> : null}
          <WeaponBlock title="Ranged" weapons={ranged} scope="ranged" marks={marks?.weapons} />
          <WeaponBlock title="Melee" weapons={melee} scope="melee" marks={marks?.weapons} />
          {listOnly ? null : (
            <section>
              <h3 className="text-xs tracking-wide text-gold uppercase">Equipped</h3>
              <p className="mt-1 text-sm">{sheet.fixed}</p>
              {sheet.swaps ? <p className="mt-1 text-sm text-muted">{sheet.swaps}</p> : null}
            </section>
          )}
          <section>
            <h3 className="text-xs tracking-wide text-gold uppercase">Abilities</h3>
            <ul className="mt-2 flex flex-col gap-3">
              {abilities.map((ability) => (
                <li key={ability.name}>
                  <p className="text-sm font-medium">{ability.name}</p>
                  <p className="text-sm text-muted">{ability.rule}</p>
                </li>
              ))}
            </ul>
          </section>
          {keywordText ? (
            <section>
              <h3 className="text-xs tracking-wide text-gold uppercase">Keywords</h3>
              <KeywordLine text={keywordText} marked={markedKeywords} />
              {keywords ? <p className="mt-1 text-sm text-muted">Faction: {keywords.faction}</p> : null}
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
