import { BuildConfigBase } from "bun";
import { BuildConfig } from "./config.types";
import { defaultConfigProps } from "./defaultConfigProps";
import { mergeConfigProp } from "./mergeConfigProp";

export const extendConfigByDefaultProps = async (config: BuildConfig) => {
  const newConfig = {};

  const defaultConfigKeys = Object.keys(defaultConfigProps);
  const configKeys = Object.keys(config);

  const keys = Array.from(new Set([...defaultConfigKeys, ...configKeys]));

  for (const key of keys) {
    newConfig[key] = await mergeConfigProp(
      config[key],
      await defaultConfigProps[key]?.()
    );
  }

  return newConfig as BuildConfigBase;
};
