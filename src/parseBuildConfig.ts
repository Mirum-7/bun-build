import type { BuildConfig } from "bun";
import { resolve } from "path";

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

  throw new Error(
    `Build config file not found.\n - ${BUILD_CONFIG_FILES.join("\n - ")}`
  );
};
