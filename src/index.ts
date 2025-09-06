#!/usr/bin/env bun
import { build } from "bun";
import { rm } from "fs/promises";
import { resolve } from "path";
import { getOutputTable } from "./getOutputTable";
import { parseBuildConfig } from "./parseBuildConfig";
export * from "./config.types";

const start = performance.now();

try {
  const config = await parseBuildConfig();

  const { outdir = resolve(process.cwd(), "dist") } = config;

  if (await Bun.file(outdir).exists()) {
    console.log(`Cleaning previous build at ${outdir}`);
    await rm(outdir, { recursive: true, force: true });
  }

  const result = await build(config);

  console.table(getOutputTable(result));
} catch (error) {
  if (!(error instanceof Error)) {
    throw error;
  }

  console.error(error.message);
  process.exit(1);
}

const end = performance.now();

console.log(`Build completed successfully in ${(end - start).toFixed(2)}ms`);
