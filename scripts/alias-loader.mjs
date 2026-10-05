import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

export async function resolve(specifier, context, nextResolve) {
  if (!specifier.startsWith("@/")) return nextResolve(specifier, context);
  const rest = specifier.slice(2);
  const candidates = [`../src/${rest}`, `../src/${rest}.ts`, `../src/${rest}.tsx`];
  for (const candidate of candidates) {
    const url = new URL(candidate, import.meta.url);
    if (existsSync(fileURLToPath(url))) return nextResolve(url.href, context);
  }
  return nextResolve(new URL(`../src/${rest}`, import.meta.url).href, context);
}
