import { join } from "path";
import { BuildConfig } from "./src/config/config.types";

const config: BuildConfig = {
  target: "bun",
  minify: true,
};

export default config;
