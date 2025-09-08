#!/usr/bin/env bun
import { build } from "bun";
import { rm } from "fs/promises";
import { mergeConfigs } from "./config";
import { getOutputTable } from "./getOutputTable";
import { parseBuildConfig } from "./parsers/parseBuildConfig";
export * from "./config/config.types";

const start = performance.now();

const cleanPreviousBuild = async (dir: string) => {
  if (await Bun.file(dir).exists()) {
    console.log(`Cleaning previous build at ${dir}`);
    await rm(dir, { recursive: true, force: true });
  }
};

try {
  const fileConfig = await parseBuildConfig();

  const config = await mergeConfigs(fileConfig);

  let { outdir } = config;

  await cleanPreviousBuild(outdir);

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
