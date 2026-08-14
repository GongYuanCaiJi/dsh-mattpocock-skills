// dsh-mattpocock-skills plugin entry.
//
// The skills themselves are the upstream mattpocock/skills files verbatim
// (see THIRD_PARTY_NOTICES.md); this entry and lib/skills.js are the only dsh
// adaptation layer — registering them with the dsh skills registry so the
// `skill` tool can load them at runtime.

import { registerMattpocockSkills } from './lib/skills.js'

export const name = 'dsh-mattpocock-skills'

export function apply(ctx) {
  registerMattpocockSkills(ctx)
}
