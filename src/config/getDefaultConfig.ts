import { resolve } from "path";
import { parseEntrypointFromPackageJson } from "../parsers";

export const getDefaultConfig = {
  entrypoints: () => parseEntrypointFromPackageJson(),
  outdir: async () => resolve(process.cwd(), "dist"),
};
