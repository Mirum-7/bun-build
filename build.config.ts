import { BuildConfig } from "bun";
import { join } from "path";

const paths = {
  entrypoint: join(process.cwd(), "src", "index.ts"),
  output: join(process.cwd(), "dist"),
};

const config: BuildConfig = {
  entrypoints: [paths.entrypoint],
  target: "bun",
  outdir: paths.output,
  minify: true,
};

export default config;
