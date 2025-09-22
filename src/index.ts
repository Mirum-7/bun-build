#!/usr/bin/env bun
import { build } from "bun";
import { readdir, rm } from "fs/promises";
import { relative } from "path";
import { extendConfigByDefaultProps } from "./config";
import { getOutputTable } from "./getOutputTable";
import { parseBuildConfig } from "./parsers/parseBuildConfig";

const start = performance.now();

const cleanPreviousBuild = async (dir: string) => {
  let exists = false;
  try {
    await readdir(dir);
    exists = true;
  } catch {}

  if (exists) {
    console.log(
      `Cleaning previous build at "./${relative(process.cwd(), dir)}"`
    );
    await rm(dir, { recursive: true, force: true });
  }
};

try {
  const fileConfig = await parseBuildConfig();

  const config = await extendConfigByDefaultProps(fileConfig);

  let { outdir } = config;

  await cleanPreviousBuild(outdir!);

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
