import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Context } from '@deepseek-ai/cordis'
import { SkillRegistry, isSkillName } from '@deepseek-ai/dsh-skill'
import { listBundledSkills, registerMattpocockSkills, PROVIDER } from '../lib/skills.js'
import { apply } from '../index.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const SKILLS_BASE = join(ROOT, 'skills')

// Independent source of truth: the pinned upstream manifest
// mattpocock/skills@v1.2.3 (.claude-plugin/plugin.json, gitHead
// 6acc160e4e0cd062dbbbd7a1b26ae92855edf07e). The port ships exactly the
// skills the upstream plugin ships — nothing more, nothing less.
const EXPECTED_SKILLS = [
  // skills/engineering
  'ask-matt', 'code-review', 'codebase-design', 'diagnosing-bugs',
  'domain-modeling', 'grill-with-docs', 'implement',
  'improve-codebase-architecture', 'prototype', 'research',
  'resolving-merge-conflicts', 'setup-matt-pocock-skills', 'tdd', 'to-spec',
  'to-tickets', 'triage', 'wayfinder', 'wizard',
  // skills/productivity
  'grill-me', 'grilling', 'handoff', 'teach', 'to-questionnaire',
  'wait-what', 'writing-for-agents',
]

function makeContext() {
  const ctx = new Context()
  const registry = new SkillRegistry(ctx)
  return { ctx, registry }
}

test('listBundledSkills returns exactly the upstream plugin surface', () => {
  const candidates = listBundledSkills()
  const names = candidates.map((c) => c.name).sort()
  assert.deepEqual(names, [...EXPECTED_SKILLS].sort())
})

test('every candidate satisfies the dsh skill registry contract', () => {
  const candidates = listBundledSkills()
  assert.ok(candidates.length > 0)
  for (const c of candidates) {
    assert.ok(isSkillName(c.name), `invalid skill name ${c.name}`)
    assert.equal(typeof c.description, 'string')
    assert.ok(c.description.length > 0, `${c.name} must have a description`)
    assert.deepEqual(c.invocation, { modelInvocable: true, userInvocable: true })
    assert.equal(c.provider, PROVIDER)
    assert.equal(c.source, 'bundled')
    assert.equal(c.rank, 600)
    assert.equal(c.resourceBase?.kind, 'directory')
    assert.ok(typeof c.resourceBase?.path === 'string')
    // locator must point at the skill's SKILL.md inside the package
    assert.equal(c.locator, join(c.resourceBase.path, 'SKILL.md'))
    assert.ok(readFileSync(c.locator, 'utf8').length > 0)
  }
})

test('registerMattpocockSkills wires the provider into a real registry', async () => {
  const { ctx, registry } = makeContext()
  registerMattpocockSkills(ctx)
  const summaries = await registry.list({ cwd: ROOT })
  const names = summaries.map((s) => s.name).sort()
  assert.deepEqual(names, [...EXPECTED_SKILLS].sort())
  for (const s of summaries) {
    assert.ok(s.description.length > 0, `${s.name} catalog description missing`)
    assert.equal(s.invocation.modelInvocable, true)
  }
})

test('registry.get loads verbatim upstream content through the provider', async () => {
  const { ctx, registry } = makeContext()
  registerMattpocockSkills(ctx)
  const skill = await registry.get('tdd', { cwd: ROOT })
  assert.ok(skill, 'tdd must resolve')
  const onDisk = readFileSync(join(SKILLS_BASE, 'engineering', 'tdd', 'SKILL.md'), 'utf8')
  assert.equal(skill.content, onDisk, 'content must be the verbatim upstream SKILL.md')
  assert.equal(skill.name, 'tdd')
  assert.equal(skill.provider, PROVIDER)
  assert.equal(skill.source, 'bundled')
  assert.equal(skill.resourceBase?.kind, 'directory')
  assert.equal(skill.resourceBase?.path, join(SKILLS_BASE, 'engineering', 'tdd'))
  assert.ok(skill.description.length > 0)
})

test('index apply() registers the full catalog', async () => {
  const { ctx, registry } = makeContext()
  apply(ctx)
  const summaries = await registry.list({ cwd: ROOT })
  assert.deepEqual(summaries.map((s) => s.name).sort(), [...EXPECTED_SKILLS].sort())
})
