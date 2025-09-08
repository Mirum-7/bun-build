import { join } from "path";
import { BuildConfig } from "./src/config.types";

const paths = {
  output: join(process.cwd(), "dist"),
};

const config: BuildConfig = {
  target: "bun",
  outdir: paths.output,
  minify: true,
};

export default config;
