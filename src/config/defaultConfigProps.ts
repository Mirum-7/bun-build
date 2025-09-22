import { resolve } from "path";
import { parseEntrypointFromPackageJson } from "../parsers";
import type { BuildConfig } from "./config.types";
import { parsePeerDependencies } from '../parsers/parsePeerDependencies';

type DefaultConfig = {
  [key in keyof BuildConfig]: () => Promise<BuildConfig[key]>;
};

export const defaultConfigProps: DefaultConfig = {
  entrypoints: () => parseEntrypointFromPackageJson(),
  outdir: async () => resolve(process.cwd(), "dist"),
  external: () => parsePeerDependencies(),
};
