# Third-party notices

## mattpocock/skills

This package is a port of [`mattpocock/skills`](https://github.com/mattpocock/skills).
The upstream source is used under the MIT License.

| | |
|---|---|
| Package | [`mattpocock/skills@v1.2.3`](https://github.com/mattpocock/skills/tree/v1.2.3) |
| Repository | [mattpocock/skills](https://github.com/mattpocock/skills) |
| Author | Matt Pocock |
| License | MIT |
| Release date | 2026-08-06 |
| Tarball | `https://github.com/mattpocock/skills/archive/refs/tags/v1.2.3.tar.gz` |
| Integrity | `sha256-I4+sVND1PT4tBQHBs4ycDk6bwm9rBXtTpzKOoV1Dtm8=` |
| shasum (sha1) | `0e608f4e58b07773e6563d167e6839319e2a1f75` |
| SHA-256 | `238fac54d0f53d3e2d0501c1b38c9c0e4e9bc26f6b057b53a7328ea15d43b66f` |
| gitHead | `6acc160e4e0cd062dbbbd7a1b26ae92855edf07e` |

### What the port ships

The upstream repo contains skills under `skills/engineering/`, `skills/productivity/`,
`skills/misc/`, `skills/in-progress/`, and `skills/deprecated/`. Its plugin manifest
(`.claude-plugin/plugin.json` at v1.2.3) ships **25 skills** — all of
`skills/engineering/` (18) and `skills/productivity/` (7) — and excludes the other
three directories. This port ships exactly that surface, verbatim, under the same
paths. The excluded directories are not part of the upstream plugin and are not
ported.

### Verifying the verbatim claim yourself

The README states that all shipped skill files are byte-identical to upstream.
You do not have to take that on trust — fetch the pinned upstream tarball and
compare:

```bash
curl -sL https://github.com/mattpocock/skills/archive/refs/tags/v1.2.3.tar.gz | tar xz
diff -rq skills-1.2.3/skills/engineering skills/engineering && echo "engineering OK"
diff -rq skills-1.2.3/skills/productivity skills/productivity && echo "productivity OK"
```

The only expected differences are the upstream directories this port deliberately
does not ship (`skills-1.2.3/skills/misc`, `skills-1.2.3/skills/in-progress`,
`skills-1.2.3/skills/deprecated`) — they are not part of the upstream plugin surface.

Expected SHA-256 of every shipped file (76 files):

```
7de5a70b2eecdc9987c7ed5a5688764cb762b6099b25ca833251e632183a4d68  skills/engineering/README.md
bd0fe4291d25064080a5b880a17d2ebe320e65a63747a2d69a64b04d72a0d03e  skills/engineering/ask-matt/PHASE-BOUNDARIES.md
3d38910535f5f01e15bc5fd7f6ca8880d628cd248741f08e6780dd7c1828e832  skills/engineering/ask-matt/SKILL.md
bdffbc5a0a99ed1b6ef3253d251d755fd18162b9845972e380007f844b09b05c  skills/engineering/ask-matt/agents/openai.yaml
9cf46653dd9c710ea1e6c22423caf31a794c88773bc94bdaa23140277f470442  skills/engineering/code-review/SKILL.md
8229ca854e11dc8e6aef2131ee03f31fb1561cf905fab9ccc325180cf3331352  skills/engineering/code-review/agents/openai.yaml
125e6b77413ad2bc7cf7a772bc74336d580a50f9e797db2178ed133d62333d06  skills/engineering/codebase-design/DEEPENING.md
09f9948ea7636a4d3704c5ab909762e876c0b39849eefb14d2e03a398cc9c7e7  skills/engineering/codebase-design/DESIGN-IT-TWICE.md
a8d50abac5a4018f60e1d911d4b6f4e36454ca14d6c390c0695a578c7de65dad  skills/engineering/codebase-design/SKILL.md
edebc9e4fcfe102114012575eaa9600b9b5fd08c311664f389c36e7bc717740f  skills/engineering/codebase-design/agents/openai.yaml
b9339b09ee3980808d8c5a35c7251b891b8b1e0036ec4ca37812b976ebddf6b6  skills/engineering/diagnosing-bugs/SKILL.md
3e430dbe4334a87597488c060cb3dc3786bb00c9182877d6f5ec41f62490e90b  skills/engineering/diagnosing-bugs/agents/openai.yaml
18ae07e1cc49b32c71767e241a6e8de4be74ef21d5e3b7e39034d9c7335f2d80  skills/engineering/diagnosing-bugs/scripts/hitl-loop.template.sh
f1f36cd3f8d3b6474ddd5855da4e233bfc4ae1a1c5024909ccf11871819a41b2  skills/engineering/domain-modeling/ADR-FORMAT.md
b8cc318f2a4285b530e908b6bc43901c3c5cd11100362636bbc4216639bef597  skills/engineering/domain-modeling/CONTEXT-FORMAT.md
152e2c97239affb12a60c5f4a7e74ab546a49ae169688c81f4e2ccc42dafa579  skills/engineering/domain-modeling/SKILL.md
f6bf2aa996c6e6f53fdd0708e18a0d16a56aed8322cca59fedbe3c0d2c75f06b  skills/engineering/domain-modeling/agents/openai.yaml
610d091047bcfb9db0f75c057d15538481a721111579fc5ec7f83ad9131a2165  skills/engineering/grill-with-docs/SKILL.md
94cd0ab161fb468a836349f5ed482ba58ce8e709a05c57ce533d739dbd35cca9  skills/engineering/grill-with-docs/agents/openai.yaml
6d3fd9e83b8f36e5213854779db49b256a457a7ebb4a503e53fa7dcff696adc3  skills/engineering/implement/SKILL.md
8970a8596ade0c28ab427f41a4ea242d6bdf6186c59ebf55e1238dbecaab79dc  skills/engineering/implement/agents/openai.yaml
0b0936104158abeef7246ff6cbabefa4dc055f17589f2833f2d93001421910a1  skills/engineering/improve-codebase-architecture/HTML-REPORT.md
7b76f01b0eefe49a127754c9027a6235a036a21348df5dad988893d8b2f384d6  skills/engineering/improve-codebase-architecture/SKILL.md
c8cb20f68ebf0edb4e497bc11ae5fcaa196004e661cd189015b04f4109ced7f1  skills/engineering/improve-codebase-architecture/agents/openai.yaml
5aef84c2ef514dd2a7268433abd3ee8e47b35f42b60e0b5f7430ec4937f4f06a  skills/engineering/prototype/LOGIC.md
2579ecf89a7fb7e73345117405c7ba9b9fb5ab22a78ecb08b0ce68b73f0148c2  skills/engineering/prototype/SKILL.md
e2ca04434be54acdee2f5df582ef8038fadf582bbcc99be0d2e27737ff8ed096  skills/engineering/prototype/UI.md
5af65e43ab41a350436697b81e27b7f848d36782043b73c322bb2c9fa9cc55dc  skills/engineering/prototype/agents/openai.yaml
af378829f015775a3bcd65ff466826722e99359017ae6bae227ca4c9bd14049c  skills/engineering/research/SKILL.md
9b4c470d63221c1f68f22df70b83e2f12401b317babe0d1b7b5f24a974474d0d  skills/engineering/research/agents/openai.yaml
c7c9ba81362a786aac05d2223123bf1bd2f8a99c3243a72882ede9c68bedfb24  skills/engineering/resolving-merge-conflicts/SKILL.md
a1f4f96838f2ed6282eb28abbbf99029cb8fadce552baf53da90a025b8bffddf  skills/engineering/resolving-merge-conflicts/agents/openai.yaml
310fb1a73c0467e617e17d7c41d4a2278b5405c4a27f36d7cd22bb4599aee6bb  skills/engineering/setup-matt-pocock-skills/SKILL.md
9527de0110541c45712319025155aeab8dc7d77c6ed6e5e83271bab1851ab939  skills/engineering/setup-matt-pocock-skills/agents/openai.yaml
25be404b58798b3cb2d51c93dba2ab052fc3a425632185726ac3f5fcff193b99  skills/engineering/setup-matt-pocock-skills/domain.md
ec8332bb69e7e79e349989e940be481a0c79b552be3acc613e718278bcc5e03d  skills/engineering/setup-matt-pocock-skills/issue-tracker-github.md
16ea4a727803876cbc763e1f6b00992b3b393ba5e0cd394382dccc0f8d83c564  skills/engineering/setup-matt-pocock-skills/issue-tracker-gitlab.md
6f38f66f9ffce2fdc26c43608d06b527f60e45c6f43003d0ea77d4e2641c9de3  skills/engineering/setup-matt-pocock-skills/issue-tracker-local.md
4f53c9b40ce2651e3611aa090eaedbd6dbc9b71ef8c5f7e65eac0d8263190d0d  skills/engineering/setup-matt-pocock-skills/triage-labels.md
5e6b9c16b547113e90afbb946489d1c1384be5c2128f0159bd0bee57251ecf08  skills/engineering/tdd/SKILL.md
ea6f01cf1b8c06a4b0f5b649d74b1b8ce8685e72af1b38d70d877693e092af0b  skills/engineering/tdd/agents/openai.yaml
3ceb807fdf4a47d6a93d4d9a891e5ba6d362a6247bd08adc451feebfc17361ef  skills/engineering/tdd/mocking.md
859f9e592c188fda4fc7277dd180e4ce9c7a2e13f6efe1f6f29eccc9d28c106a  skills/engineering/tdd/tests.md
5d26479544b08048d3a8f79d937b39bc613a617f026b3fd083bafc1e99a7b811  skills/engineering/to-spec/SKILL.md
1c5b4d1e3d8e52287ef19cc2742fdbbfae1914ac75d33af3e4c8174f08cc55bb  skills/engineering/to-spec/agents/openai.yaml
5ecdf1d4df8a360ed39df21a2347f97ba177afd449a577da4f6b6ea8e1ebb808  skills/engineering/to-tickets/SKILL.md
21bc6215fffcd7614e9f772bb1760e87cc5fc7dcc707e7d282bc9414267a6090  skills/engineering/to-tickets/agents/openai.yaml
5b78d347cc53f6bcf7b875106005ccf5315055fa4cf75eb28d41e96ee426d27b  skills/engineering/triage/AGENT-BRIEF.md
2526f998fd7ca5e956d3f6f234bcc2431a5971ee769f1148ddc60b92f04d5914  skills/engineering/triage/OUT-OF-SCOPE.md
91e2817ecb688c4df4e2444eab472d1d79d2a0a57abf9f6726967664c460ff2e  skills/engineering/triage/SKILL.md
2e683717720cf456d165d0bb1a68bb600d0b6a8ccb61841c172e50d26f95351c  skills/engineering/triage/agents/openai.yaml
d33e2141f7c8bbfd137fef0213cbec465820e4680e67da5d0f0815d6742d26c2  skills/engineering/wayfinder/SKILL.md
88bc81a11a6d52ac67aeaa76b8b619e387020d47c5133a4dd4927fd15c4ad073  skills/engineering/wayfinder/agents/openai.yaml
7fb2b4ba23870ec028c85c6d7ef1ca573413ca7026bd4d410fe0e6d8dc9d1e92  skills/engineering/wizard/SKILL.md
98f44d682d58e262f160dc59a8befc365e0aa65820dd0261864af26aa8e59d83  skills/engineering/wizard/agents/openai.yaml
d43dc3f7b6008779ef55e3935bf1df246b5bc194b7f9e1dee3d9340a00922ce6  skills/engineering/wizard/template.sh
f50213d4832e9420b6b5b32df07eecc2d663cad7c0083b72274c33a3546d854b  skills/productivity/README.md
6189dfceb7304a6e5558f75d87e68fa3bc7fcf7ba120e44f21f8a61fe01eba54  skills/productivity/grill-me/SKILL.md
c061e39c3e0f9d865fb1b97556d485704af2a8a58f4b8221a8917a5c2074a32b  skills/productivity/grill-me/agents/openai.yaml
fa5c1e5ee76b1c8f1ae56101f52c9e239de75d5c578adc61227b92d10b7e52ef  skills/productivity/grilling/SKILL.md
1411d7df7d99b7e621a1ff8283c8133cc2464be63d064e52d8ce169c6800ee9b  skills/productivity/grilling/agents/openai.yaml
57c9f1f392d7352cdc85b1e39ca49eddc70ce1dc278bd9653fb4f23dfc2560fc  skills/productivity/handoff/SKILL.md
5c479fd562c691851690e8b18c8501045bef0943c10743d636b2fae26add1d28  skills/productivity/handoff/agents/openai.yaml
d177def491519d97873291f2e860d8f1d60ead78feecb82eee022177958069c6  skills/productivity/teach/GLOSSARY-FORMAT.md
855f81017625256584bbf62bd5edb9b0c86605c4cc1139c56acc36b802595d17  skills/productivity/teach/LEARNING-RECORD-FORMAT.md
8da6d3ac84eb2eb19f17c260b6acf01c560d3ac7a4501c415eea0e985602f4d7  skills/productivity/teach/MISSION-FORMAT.md
2bc634a64b0d0daa10904f9222e7aa0d361420dfacabbf092fbe3a72222edc08  skills/productivity/teach/RESOURCES-FORMAT.md
6d2dbe5e03084cf26fef66b535127b36cd1bcbe9478e26b0626029cd51dc2259  skills/productivity/teach/SKILL.md
5856f3ae8aec742f1499c640aecdd5f1d6af5fa210a7c6ec794de8263a6f733f  skills/productivity/teach/agents/openai.yaml
8e7f9ed8d7b2e66babf1a54aee9b94319bf38c32619cffe78819df6518ead5fc  skills/productivity/to-questionnaire/SKILL.md
9e8a06c38c8842eea8d4922cb9d1ead8e3ace647bab259b943c994a1b4742bc2  skills/productivity/to-questionnaire/agents/openai.yaml
8923f7df1a0d1b138281658e134caa4bf1c618d2876a2323b19acdfdffebc024  skills/productivity/wait-what/SKILL.md
3ec661af8fc7063b650518c95ab775bbeabaefce38b89acaf6da2f749168f37e  skills/productivity/wait-what/agents/openai.yaml
b4c54a0aaad3f6eddefde6d06770a0e401fbb8fc6a8f49ce18af816bd144d14d  skills/productivity/writing-for-agents/SKILL-MECHANICS.md
a842323e664e5af104eac5c97ad22fda929ebeb62d81c501161ac1f6f482db58  skills/productivity/writing-for-agents/SKILL.md
eacb24b2a618cfb81dacb0416f4fdd75ddf3a8060f8ddb99aae1b1e301907e4b  skills/productivity/writing-for-agents/agents/openai.yaml
```

## dsh-lens (adaptation pattern)

The provider code in `lib/skills.js` (list candidates from a package-relative
skills directory, load SKILL.md content on demand, register via
`ctx.skills.registerProvider`) is adapted from
[`dsh-lens@0.2.5`](https://www.npmjs.com/package/dsh-lens) `dist/skills.js`,
MIT — Copyright (c) 2026 dsh-lens contributors. The scan adds one directory
level to match the upstream repository layout; the registration pattern is
unchanged.
