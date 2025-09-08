import type { BuildConfig } from "./config.types";
import { getDefaultConfig } from "./getDefaultConfig";

export const mergeConfigs = async (config: BuildConfig) => {
  const newConfig = { ...config };

  const keys = Object.keys(
    getDefaultConfig
  ) as unknown as (keyof typeof getDefaultConfig)[];

  for (const key of keys) {
    if (newConfig[key] !== undefined) {
      continue;
    }

    const defaultValue = await getDefaultConfig[key]();

    // @ts-ignore
    newConfig[key] = defaultValue;
  }

  return newConfig as Promise<BuildConfig & Required<typeof getDefaultConfig>>;
};
