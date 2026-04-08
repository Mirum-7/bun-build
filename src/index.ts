#!/usr/bin/env bun
import { build } from 'bun';
import { rm } from 'fs/promises';
import { resolveConfig } from './config';
import { getOutputTable } from './getOutputTable';
import { installSkills } from './installSkills';
import { parseBuildConfig } from './parsers';

if (process.argv[2] === 'install-skills') {
  await installSkills();
  process.exit(0);
}

const start = performance.now();

try {
  const fileConfig = await parseBuildConfig();
  const config = await resolveConfig(fileConfig);

  await rm(config.outdir, { recursive: true, force: true });

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
