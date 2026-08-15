// Bundled-skill provider for dsh-mattpocock-skills.
//
// The provider pattern (list candidates from a package-relative skills dir,
// load SKILL.md content on demand) is adapted from dsh-lens@0.2.5
// (dist/skills.js, MIT — Copyright (c) 2026 dsh-lens contributors), which is
// the community-standard way to ship a directory of SKILL.md files in a dsh
// bundle. The scan adds one directory level to match the upstream layout
// verbatim (skills/<category>/<skill-name>/SKILL.md); everything else mirrors
// the proven pattern.
//
// The skill bodies themselves are byte-identical copies of the upstream
// mattpocock/skills files (see THIRD_PARTY_NOTICES.md for the pinned hashes).
// This file is part of the dsh adaptation layer only — no upstream skill
// content is duplicated here.
//
// SKILL.md frontmatter parsing (extractDescription / firstNonHeadingLine)
// lives in ./frontmatter.js, so this module is a pure registry adapter.

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { extractDescription, firstNonHeadingLine } from './frontmatter.js'

/** Provider identity attached to every candidate this plugin contributes. */
export const PROVIDER = 'dsh-mattpocock-skills'

/**
 * dsh's documented rank for packaged skill providers. This is the value of
 * `BUNDLED_SKILL_RANK` in @deepseek-ai/dsh-skill ("Standard precedence rank
 * for packaged skill providers and local bundled roots"); kept as a literal
 * so this package carries no runtime dependencies.
 */
const BUNDLED_SKILL_RANK = 600

/** Upstream skills carry no invocation restrictions; both surfaces are open. */
const INVOCATION = { modelInvocable: true, userInvocable: true }

/** Origin bucket for packaged skills (dsh SkillSource vocabulary). */
const SKILL_SOURCE = 'bundled'

/** Package-relative skills root, mirroring the upstream repository layout. */
const SKILLS_BASE = fileURLToPath(new URL('../skills/', import.meta.url))

/**
 * Enumerate the bundled skills as registry candidates.
 *
 * Scans `skills/<category>/<skill-name>/SKILL.md` (two levels, the upstream
 * shape: `skills/engineering/*`, `skills/productivity/*`). Only directories
 * containing a SKILL.md contribute a candidate; the description is read from
 * the frontmatter with a first-paragraph fallback, exactly like dsh-lens.
 *
 * @returns candidates ready for `ctx.skills.registerProvider`
 */
export function listBundledSkills() {
  const skills = []
  let categories
  try {
    categories = readdirSync(SKILLS_BASE, { withFileTypes: true })
  } catch (error) {
    // A package whose skills dir is missing is broken; surface the reason
    // instead of letting the registry boot with a silently empty catalog.
    console.warn(`[${PROVIDER}] cannot scan skills directory ${SKILLS_BASE}: ${error.message}`)
    return skills
  }
  for (const category of categories) {
    if (!category.isDirectory()) continue
    const categoryDir = join(SKILLS_BASE, category.name)
    for (const entry of readdirSync(categoryDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      const skillFile = join(categoryDir, entry.name, 'SKILL.md')
      if (!existsSync(skillFile)) continue
      let body
      try {
        body = readFileSync(skillFile, 'utf8')
      } catch (error) {
        // One unreadable SKILL.md must not take down the whole catalog boot.
        console.warn(`[${PROVIDER}] skipping unreadable skill ${entry.name}: ${error.message}`)
        continue
      }
      skills.push({
        name: entry.name,
        description: extractDescription(body) || `${PROVIDER} skill ${entry.name}`,
        invocation: INVOCATION,
        provider: PROVIDER,
        source: SKILL_SOURCE,
        rank: BUNDLED_SKILL_RANK,
        resourceBase: { kind: 'directory', path: join(categoryDir, entry.name) },
        locator: skillFile,
      })
    }
  }
  return skills
}

/**
 * Register the bundled skills with the dsh skills registry.
 *
 * Uses `ctx.inject(['skills'], ...)` (not `ctx.get('skills')`) so the
 * registration happens when the skills service is available and the plugin
 * still loads in compositions where it is not. Content is loaded lazily via
 * the provider `get()` — only catalog metadata is read at boot.
 *
 * @param ctx - plugin context from `apply()`
 */
export function registerMattpocockSkills(ctx) {
  ctx.inject(['skills'], (skillCtx) => {
    const candidates = listBundledSkills()
    if (candidates.length === 0) {
      // A package whose skills dir is missing/empty is broken; fail loudly
      // instead of silently advertising an empty catalog.
      console.warn(`[${PROVIDER}] no bundled skills found under skills/ — catalog will be empty`)
      return
    }
    const provider = {
      name: PROVIDER,
      list: () => Promise.resolve(candidates),
      async get(candidate) {
        try {
          // Definition = candidate metadata + the verbatim SKILL.md body.
          return { ...candidate, content: readFileSync(candidate.locator, 'utf8') }
        } catch {
          // undefined is the registry's not-found contract; list() only ever
          // yields existing locators, so this is a belt for races/deletion.
          return undefined
        }
      },
    }
    skillCtx.skills.registerProvider(() => provider)
  })
}
