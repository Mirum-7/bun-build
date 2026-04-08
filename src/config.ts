import type { BuildConfig as BunBuildConfig } from 'bun';
import { resolve } from 'path';
import { parseEntrypointFromPackageJson, parsePeerDependencies } from './parsers';

export type BuildConfig = Partial<BunBuildConfig>;
export type BuildConfigWithOutDir = BunBuildConfig & Required<Pick<BunBuildConfig, 'outdir'>>;

export const resolveConfig = async (config: BuildConfig): Promise<BuildConfigWithOutDir> => {
  const { entrypoints, outdir, external, ...rest } = config;

  return {
    ...rest,
    entrypoints: entrypoints ?? (await parseEntrypointFromPackageJson()),
    outdir: outdir ?? resolve(process.cwd(), 'dist'),
    external: [...(external ?? []), ...(await parsePeerDependencies())],
  } as BuildConfigWithOutDir;
};
