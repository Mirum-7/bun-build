import type { BuildConfig as BunBuildConfig } from 'bun';
import { resolve } from 'path';
import { parseEntrypointFromPackageJson, parsePeerDependencies } from './parsers';

export type BuildConfig = Partial<BunBuildConfig>;

export const resolveConfig = async (config: BuildConfig): Promise<BunBuildConfig> => {
  const { entrypoints, outdir, external, ...rest } = config;

  return {
    ...rest,
    entrypoints: entrypoints ?? (await parseEntrypointFromPackageJson()),
    outdir: outdir ?? resolve(process.cwd(), 'dist'),
    external: [...(external ?? []), ...(await parsePeerDependencies())],
  } as BunBuildConfig;
};
