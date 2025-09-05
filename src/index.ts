#!/usr/bin/env bun
import { build } from "bun";
import { parseBuildConfig } from "./parseBuildConfig";
export * from "./config.types";

try {
  const config = await parseBuildConfig();
  build(config);
} catch (error) {
  if (!(error instanceof Error)) {
    throw error;
  }

  console.error(error.message);
  process.exit(1);
}

console.log("Build completed successfully.");
