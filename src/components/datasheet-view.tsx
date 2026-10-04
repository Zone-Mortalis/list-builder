import { useEffect, useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { datasheetById, KEYWORDS, type WeaponProfile } from "@/data/datasheets";
import { explainTag, FLY_RULE } from "@/data/rules";
import { gearGroups, gearLine, weaponTaken, type GearGroup } from "@/data/units";

function WeaponLine({ weapon }: { weapon: WeaponProfile }) {
  const melee = weapon.range === "Melee";
  const skill = weapon.skill.replace(/^BS |^WS /, "");
  const tags = weapon.tags?.split(",").map((tag) => tag.trim()).filter(Boolean) ?? [];
  const [open, setOpen] = useState<string | null>(null);
  const explained = open ? explainTag(open) : undefined;
  const cells = [
    ["R", weapon.range],
    [melee ? "WS" : "BS", skill],
    ["A", weapon.a],
    ["S", weapon.s],
    ["AP", weapon.ap],
    ["D", weapon.d],
  ];
  return (
    <li className="rounded-lg border border-line bg-bg px-3 py-2">
      <p className="text-sm font-medium">{weapon.name}</p>
      {tags.length > 0 ? (
        <div className="mt-1 flex flex-wrap gap-1">
          {tags.map((tag) =>
            explainTag(tag) ? (
              <button
                key={tag}
                type="button"
                onClick={() => setOpen(open === tag ? null : tag)}
                className={`min-h-11 rounded-lg border px-2 text-xs ${
                  open === tag ? "border-gold text-gold" : "border-line text-muted"
                }`}
              >
                {tag}
              </button>
            ) : (
              <span key={tag} className="inline-flex min-h-11 items-center text-xs text-muted">
                {tag}
              </span>
            ),
          )}
        </div>
      ) : null}
      {explained ? (
        <p className="text-xs text-muted">
          {explained.only ? `Only against ${explained.only}. ` : ""}
          {explained.rule}
        </p>
      ) : null}
      <dl className="mt-2 grid grid-cols-6 gap-1 text-center">
        {cells.map(([label, value]) => (
          <div key={label}>
            <dt className="text-[10px] tracking-wide text-gold uppercase">{label}</dt>
            <dd className="text-xs">{value}</dd>
          </div>
        ))}
      </dl>
    </li>
  );
}

function KeywordLine({ text }: { text: string }) {
  const parts = text.split(",").map((part) => part.trim()).filter(Boolean);
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-1">
      <p className="text-sm">
        {parts.map((part, index) => (
          <span key={`${part}-${index}`}>
            {index > 0 ? ", " : ""}
            {part === "Fly" ? (
              <button type="button" onClick={() => setOpen((current) => !current)} className="min-h-11 text-gold underline">
                Fly
              </button>
            ) : (
              part
            )}
          </span>
        ))}
      </p>
      {open ? <p className="mt-1 text-sm text-muted">{FLY_RULE}</p> : null}
    </div>
  );
}

function WeaponBlock({ title, weapons }: { title: string; weapons: WeaponProfile[] }) {
  if (weapons.length === 0) return null;
  return (
    <section>
      <h3 className="text-xs tracking-wide text-gold uppercase">{title}</h3>
      <ul className="mt-2 flex flex-col gap-2">
        {weapons.map((weapon) => (
          <WeaponLine key={`${title}-${weapon.name}`} weapon={weapon} />
        ))}
      </ul>
    </section>
  );
}

export function WargearPicker({
  unitId,
  gear,
  onGear,
}: {
  unitId: string;
  gear?: Record<string, string>;
  onGear: (groupId: string, choiceId: string) => void;
}) {
  const groups = gearGroups(unitId);
  if (groups.length === 0) return null;
  return (
    <div className="mt-2 flex max-w-full min-w-0 flex-col items-start gap-1.5">
      {groups.map((group) => (
        <GearGroupControl key={group.id} group={group} gear={gear} onGear={onGear} />
      ))}
    </div>
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
  return (
    <select
      aria-label="Weapon"
      value={selected}
      onChange={(event) => onGear(group.id, event.target.value)}
      className="weapon-select h-8 max-w-full rounded-lg border border-line bg-bg px-2 text-xs text-fg"
    >
      {group.choices.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
          {item.points ? ` +${item.points} pts` : ""}
        </option>
      ))}
    </select>
  );
}

export function DatasheetView({
  unitId,
  unitName,
  gear,
  enhancement,
  listOnly = false,
  onClose,
}: {
  unitId: string;
  unitName: string;
  gear?: Record<string, string>;
  enhancement?: { name: string; rule: string };
  listOnly?: boolean;
  onClose: () => void;
}) {
  const sheet = datasheetById(unitId);
  const keywords = KEYWORDS[unitId];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!sheet) return null;

  const stats = [
    ["M", sheet.stats.m],
    ["T", sheet.stats.t],
    ["Sv", sheet.stats.sv],
    ["W", sheet.stats.w],
    ["Ld", sheet.stats.ld],
    ["OC", sheet.stats.oc],
    sheet.stats.inv ? ["Inv", sheet.stats.inv] : null,
    sheet.stats.damaged ? ["Damaged", sheet.stats.damaged] : null,
  ].filter((item) => item != null);

  const ranged = listOnly ? sheet.ranged.filter((weapon) => weaponTaken(unitId, weapon.name, gear)) : sheet.ranged;
  const melee = listOnly ? sheet.melee.filter((weapon) => weaponTaken(unitId, weapon.name, gear)) : sheet.melee;
  const selectedKit = gearLine(unitId, gear);

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
        <dl className="mt-3 flex flex-wrap gap-2">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-line bg-bg px-2 py-1 text-center">
              <dt className="text-[10px] tracking-wide text-muted uppercase">{label}</dt>
              <dd className="text-sm">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 flex flex-col gap-4">
          {listOnly && selectedKit ? <p className="text-sm text-muted">{selectedKit}</p> : null}
          <WeaponBlock title="Ranged" weapons={ranged} />
          <WeaponBlock title="Melee" weapons={melee} />
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
              {sheet.abilities.map((ability) => (
                <li key={ability.name}>
                  <p className="text-sm font-medium">{ability.name}</p>
                  <p className="text-sm text-muted">{ability.rule}</p>
                </li>
              ))}
              {enhancement ? (
                <li>
                  <p className="text-sm font-medium">{enhancement.name}</p>
                  <p className="text-sm text-muted">{enhancement.rule}</p>
                </li>
              ) : null}
            </ul>
          </section>
          {keywords ? (
            <section>
              <h3 className="text-xs tracking-wide text-gold uppercase">Keywords</h3>
              <KeywordLine text={keywords.keywords} />
              <p className="mt-1 text-sm text-muted">Faction: {keywords.faction}</p>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
