import { resolve } from "path";
import type { BuildConfig } from "../config";

const BUILD_CONFIG_FILES = ["build.config.ts", "bun.build.config.ts"];

export const parseBuildConfig = async (): Promise<BuildConfig> => {
  for (const filename of BUILD_CONFIG_FILES) {
    const path = resolve(process.cwd(), filename);

    const isExist = await Bun.file(path).exists();

    if (!isExist) {
      continue;
    }

    const module: { default: BuildConfig } = await import(path);

    return module.default;
  }

  console.log("Build config file not found, using default config");

  return {} as BuildConfig;
};
