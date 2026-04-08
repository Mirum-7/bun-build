# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@mirum7/bun-build` — CLI build tool wrapping Bun's bundler API. Users configure builds via `build.config.ts` (or `bun.build.config.ts`) in their project root, and run `bunx bun-build`. The tool reads the config, merges it with defaults (entrypoints from `package.json` `main`, outdir `dist`, externals from `peerDependencies`), cleans the output directory, and runs `Bun.build()`.

## Commands

- **Build:** `bun run build` — bundles `src/index.ts` via itself, then generates type declarations with `tsc`
- **Lint/Format:** `bun run biome:check` — runs Biome check with auto-fix

## Architecture

- `src/index.ts` — CLI entrypoint (shebang). Orchestrates: parse config → resolve defaults → clean outdir → `Bun.build()` → print results table.
- `src/config.ts` — `BuildConfig` type (`Partial<Bun.BuildConfig>`) and `resolveConfig` that fills defaults for `entrypoints`, `outdir`, `external`.
- `src/parsers.ts` — Reads `build.config.ts` via dynamic import, extracts `main` and `peerDependencies` from consumer's `package.json`.
- `src/types.ts` — Public type re-export. `tsconfig.json` only includes this file for declaration generation (`types/types.d.ts`).

## Code Style (Biome)

- Single quotes, semicolons, trailing commas, 2-space indent, 100 char line width
- Linter focuses on unused code detection (imports, variables, parameters, private members)
