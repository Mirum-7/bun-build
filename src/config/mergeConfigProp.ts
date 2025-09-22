import { BuildConfig } from "bun";

type Value = BuildConfig[keyof BuildConfig];

export const mergeConfigProp = async <TValue extends Value>(
  value1: TValue,
  value2: TValue
): Promise<TValue> => {
  if (value1 === undefined) {
    return value2;
  }

  if (value2 === undefined) {
    return value1;
  }

  if (Array.isArray(value1) && Array.isArray(value2)) {
    return [...value1, ...value2] as TValue;
  }

  return value2;
};
