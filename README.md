<div align="center">

# dsh-mattpocock-skills

**Matt Pocock 工程技能包，原样移植为 DeepSeek Harness 插件——25 个即插即用的工程技能（grilling、spec/ticket 流程、TDD、code review、domain modeling 等），不是 vibe coding。**

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![dsh](https://img.shields.io/badge/dsh-0.1.0--rc.6-8A2BE2)](https://github.com/deepseek-ai/deepseek-harness)
[![upstream](https://img.shields.io/badge/upstream-mattpocock%2Fskills%20v1.2.3-181717)](https://github.com/mattpocock/skills)

[English](#english) · [中文](#中文)

</div>

## 中文

本插件把 [mattpocock/skills](https://github.com/mattpocock/skills)（217k+ star 的 Claude Code 技能包）
**逐字移植**为 dsh 插件：上游 `.claude-plugin/plugin.json` 宣告的 25 个技能原封不动地搬进
`skills/engineering/` 与 `skills/productivity/`，通过 dsh 的 `skill` 工具加载。上游文字是英文，
按「100% 原样复制」规则不翻译——技能正文保持上游原文。

### 功能

- **25 个技能，零改动**：工程类 18 个（`implement`、`tdd`、`code-review`、`to-spec`、`to-tickets`、
  `grill-with-docs`、`domain-modeling`、`codebase-design`、`diagnosing-bugs`、`wayfinder`、`triage`、
  `wizard` 等）+ 生产力类 7 个（`grilling`、`grill-me`、`teach`、`handoff`、`writing-for-agents` 等）。
- **逐字可自验**：所有 76 个技能文件与上游 v1.2.3 逐字节一致，杂凑钉在
  [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)，附可直接复制的 `diff -rq` 验证命令。
- **按需加载**：catalog 只暴露名字与描述，技能正文在模型真正调用时才读取，不占启动时间。

### 效果

装上之后，模型在会话中能看到技能 catalog，并在任务匹配某个技能时用 `skill` 工具加载完整正文——
`tdd`（红绿循环）、`code-review`（双轴审查）、`grilling`（拷问式提问）、`to-spec` / `to-tickets`
（需求转规格/票）等，全部按上游原样可用。也支持用户显式调用：在输入里以 `/skill-name` 开头即可加载。

### 安装

```sh
dsh plugin --profile <name> add github:GongYuanCaiJi/dsh-mattpocock-skills
```

全新 profile 首次安装时，pnpm 的 build-script 白名单可能拒绝 git 安装触发的 `prepare` 构建：
`dsh` 会打印需要在 profile 的 `pnpm-workspace.yaml` 里加的 `allowBuilds` 键，加上之后重跑同一命令即可
（本插件无 build script、零运行时依赖，白名单只是 pnpm 的通用门禁）。

本地路径安装（同样零依赖，无需先 `npm install`）：

```sh
git clone https://github.com/GongYuanCaiJi/dsh-mattpocock-skills.git
dsh plugin --profile <name> add ./dsh-mattpocock-skills
```

### 移植出身

本包是 [mattpocock/skills](https://github.com/mattpocock/skills) 的**移植**（port），
上游为 MIT 许可，Copyright (c) 2026 Matt Pocock——LICENSE 见 [LICENSE](LICENSE)，
逐字文件的杂凑与验证命令见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
只保留上游插件实际发布的 25 个技能；`skills/misc`、`skills/in-progress`、`skills/deprecated`
不在上游插件范围内，未移植。

**如果你喜欢这些技能，请也给[上游仓库](https://github.com/mattpocock/skills)点个 star。**

---

## English

This plugin is a **verbatim port** of [mattpocock/skills](https://github.com/mattpocock/skills)
(a 217k+ star Claude Code skill pack) to DeepSeek Harness: the 25 skills declared by the upstream
`.claude-plugin/plugin.json` are copied unchanged into `skills/engineering/` and
`skills/productivity/`, and loaded through dsh's `skill` tool. Per the "100% verbatim copy" rule,
the English skill bodies are **not translated**.

### Features

- **25 skills, zero changes**: 18 engineering (`implement`, `tdd`, `code-review`, `to-spec`,
  `to-tickets`, `grill-with-docs`, `domain-modeling`, `codebase-design`, `diagnosing-bugs`,
  `wayfinder`, `triage`, `wizard`, …) + 7 productivity (`grilling`, `grill-me`, `teach`, `handoff`,
  `writing-for-agents`, …).
- **Self-verifiable verbatim claim**: all 76 skill files are byte-identical to upstream v1.2.3;
  hashes are pinned in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) with copy-paste
  `diff -rq` commands.
- **Lazy loading**: the catalog exposes names and descriptions only; skill bodies are read when the
  model actually loads a skill — no boot-time cost.

### What you get

Once installed, the model sees a skill catalog in the session and loads the full body via the
`skill` tool when a task matches — `tdd` (red-green loop), `code-review` (two-axis review),
`grilling` (stress-test your plans), `to-spec` / `to-tickets` (requirement → spec/tickets), and more,
exactly as upstream. Users can also invoke a skill explicitly by starting a message with
`/skill-name`.

### Install

```sh
dsh plugin --profile <name> add github:GongYuanCaiJi/dsh-mattpocock-skills
```

On a fresh profile, pnpm's build-script allowlist may refuse the git-install `prepare` build:
`dsh` prints the exact `allowBuilds` key to add under `allowBuilds` in the profile's
`pnpm-workspace.yaml`, after which the same command succeeds (this package has no build scripts and
zero runtime dependencies — the allowlist is pnpm's generic gate).

Local-path install (also zero dependencies — no `npm install` needed first):

```sh
git clone https://github.com/GongYuanCaiJi/dsh-mattpocock-skills.git
dsh plugin --profile <name> add ./dsh-mattpocock-skills
```

### Attribution

This package is a **port** of [mattpocock/skills](https://github.com/mattpocock/skills). Upstream is
MIT licensed, Copyright (c) 2026 Matt Pocock — see [LICENSE](LICENSE); per-file hashes and
verification commands live in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Only the 25 skills
the upstream plugin actually ships are ported; `skills/misc`, `skills/in-progress`, and
`skills/deprecated` are outside the upstream plugin surface and are not included.

**If you like these skills, please also star the [upstream repository](https://github.com/mattpocock/skills).**
