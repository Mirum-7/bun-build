---
name: bun-build
description: Build a Bun project using @mirum7/bun-build. Use when the user asks to build, bundle, or create a production build of a Bun project that has @mirum7/bun-build installed.
---

# bun-build

CLI build tool wrapping Bun's bundler API.

## Run Build

```bash
bunx bun-build
```

## Configuration

Create `build.config.ts` (or `bun.build.config.ts`) in the project root:

```typescript
import type { BuildConfig } from '@mirum7/bun-build';

const config: BuildConfig = {
  target: 'bun',
  minify: true,
};

export default config;
```

## Defaults

If not specified in config:
- **entrypoints**: `package.json` `main` field
- **outdir**: `dist`
- **external**: all `peerDependencies` from `package.json`

## Config Type

`BuildConfig` is `Partial<BuildConfigBase>` from Bun — all [Bun bundler options](https://bun.sh/docs/bundler) are supported.
