import type { BuildConfigBase } from "bun";

export type BuildConfig = Omit<BuildConfigBase, "entrypoints" | "outdir"> &
  Partial<Pick<BuildConfigBase, "entrypoints" | "outdir">>;
