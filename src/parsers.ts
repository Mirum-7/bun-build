import { resolve } from 'path';
import type { BuildConfig } from './config';

// --- parsePackageJson ---

interface PackageJson {
  main?: string;
  peerDependencies?: Record<string, string>;
}

let packageJsonCache: PackageJson | null = null;

const parsePackageJson = async (): Promise<PackageJson> => {
  if (packageJsonCache) {
    return packageJsonCache;
  }

  const packageJson: PackageJson = await import(resolve(process.cwd(), 'package.json'));

  packageJsonCache = packageJson;

  return packageJson;
};

// --- parseEntrypointFromPackageJson ---

export const parseEntrypointFromPackageJson = async (): Promise<string[]> => {
  const { main } = await parsePackageJson();

  if (!main) {
    throw new Error('"main" field in package.json not found');
  }

  const mainPath = resolve(process.cwd(), main);

  const isExist = await Bun.file(mainPath).exists();

  if (!isExist) {
    throw new Error(`file "${main}"(package.json[main]) not found in project`);
  }

  return [mainPath];
};

// --- parsePeerDependencies ---

export const parsePeerDependencies = async (): Promise<string[]> => {
  const { peerDependencies } = await parsePackageJson();

  if (!peerDependencies) {
    return [];
  }

  return Object.keys(peerDependencies);
};

// --- parseBuildConfig ---

const BUILD_CONFIG_FILES = ['build.config.ts', 'bun.build.config.ts'];

export const parseBuildConfig = async (): Promise<BuildConfig> => {
  for (const filename of BUILD_CONFIG_FILES) {
    const path = resolve(process.cwd(), filename);

    const isExist = await Bun.file(path).exists();

    if (!isExist) {
      continue;
    }

    const module: { default?: BuildConfig } = await import(path);

    if (!module.default) {
      throw new Error(`Build config "${filename}" must have a default export`);
    }

    return module.default;
  }

  console.log('Build config file not found, using default config');

  return {};
};
