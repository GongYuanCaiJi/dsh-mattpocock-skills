// SKILL.md frontmatter parsing for bundled-skill descriptions.
//
// Adapted from dsh-lens@0.2.5 (dist/skills.js, MIT — Copyright (c) 2026
// dsh-lens contributors): read `description:` from the YAML frontmatter, with
// a first-non-heading-line fallback. Kept as its own module so the scanner
// (lib/skills.js) is a pure registry adapter and the SKILL.md layout rules
// (which mirror the upstream mattpocock/skills layout verbatim) live in one
// place.

/** Parse `description:` from the YAML frontmatter, falling back to prose. */
export function extractDescription(markdown) {
  const match = /^---\n([\s\S]*?)\n---/u.exec(markdown)
  if (!match) return firstNonHeadingLine(markdown)
  const described = /^description:\s*(.+)$/mu.exec(match[1] ?? '')
  return described?.[1]?.replace(/^['"]|['"]$/g, '').trim() || firstNonHeadingLine(markdown)
}

/** First non-empty, non-heading line of the markdown body (dsh-lens fallback). */
export function firstNonHeadingLine(markdown) {
  const body = markdown.replace(/^---[\s\S]*?---\n?/u, '')
  const line = body.split('\n').map((item) => item.trim()).find((item) => item && !item.startsWith('#'))
  return line
}
